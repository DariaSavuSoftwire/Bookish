from sqlalchemy.sql.util import join_condition

from bookish.models import db, Author, BookAuthors, BookLoan
from bookish.models.available_book_dto import AvailableBookDTO
from bookish.models.book import Book
from bookish.models import db
from flask import Flask, jsonify, request
from flask_jwt_extended import jwt_required
from bookish.models.book import Book


def book_routes(app):
    @app.route('/book/get_all', methods=['GET'])
    @jwt_required()
    def get_all_books():
        sorted_books = Book.query.order_by(Book.title).all()
        return jsonify({"books": [book.serialize() for book in sorted_books]}), 201

    @app.route('/book/create', methods=['POST'])
    @jwt_required()
    def add_book():
        isbn = request.json.get('ISBN')
        title = request.json.get('title')
        author_names = request.json.get('authors', [])
        copies_owned = request.json.get('copies_owned', 0)

        if Book.query.filter_by(ISBN=isbn).first():
            return jsonify({"message": "Book already exists"}), 400
        try:
            new_book = Book(isbn, title, copies_owned)
            db.session.add(new_book)
            db.session.commit()
            for author_name in author_names:
                author = Author.query.filter_by(name=author_name).first()
                if not author:
                    author = Author(name=author_name)
                    db.session.add(author)
                    db.session.commit()

                book_author = BookAuthors(ISBN=new_book.ISBN, author_id=author.id)
                db.session.add(book_author)
            db.session.commit()

            return jsonify({"message": "Book created successfully"}), 201
        except Exception as e:
            return jsonify({"message": str(e)}), 400

    @app.route('/book/filter_author', methods=['GET'])
    @jwt_required()
    def filter_author():
        author = request.json.get('author')
        books = Book.query.filter(author in Book.authors)
        return jsonify({"books": books}), 200

    @app.route('/book/filter_title', methods=['GET'])
    @jwt_required()
    def filter_title():
        title = request.json.get('title')
        books = Book.query.filter(title in Book.title)
        return jsonify({"books": books}), 200

    @app.route('/book/get_available_books', methods=['GET'])
    @jwt_required()
    def get_available_books():
        books = Book.query.all()
        available_books = []
        for book in books:
            borrowed_copies = BookLoan.query.filter_by(ISBN=book.ISBN).order_by(BookLoan.due_return.asc()).all()
            available_copies = book.copies_owned - len(borrowed_copies)
            next_return = borrowed_copies[0] if borrowed_copies else None
            available_book = AvailableBookDTO(book.title, book.ISBN, book.authors, available_copies, book.copies_owned)

            if next_return:
                available_book.set_return_date(next_return.due_return)
                available_book.set_user_to_return(next_return.username)

            available_books.append(available_book)

        return jsonify({"available_books": [available_book.serialize() for available_book in available_books]}), 200
