from bookish.controllers.utils import delete_book_authors, add_book_authors, verify_admin_user
from bookish.models import Author, BookAuthors, BookLoan, book
from bookish.models.available_book_dto import AvailableBookDTO
from bookish.models import db
from flask import jsonify, request
from flask_jwt_extended import jwt_required, get_jwt
from bookish.models.book import Book


def book_routes(app):
    @app.route('/book/get_all', methods=['GET'])
    @jwt_required()
    def get_all_books():
        page = request.args.get('page', 1, type=int)
        elements_per_page = request.args.get('elements_per_page', 10, type=int)

        if page < 1 or elements_per_page < 1:
            return jsonify({"message": "Invalid request"}), 400

        author = request.args.get('author')
        title = request.args.get('title')
        query = Book.query

        if author:
            query = query.join(BookAuthors).join(Author).filter(Author.name.ilike(f"%{author}%"))

        if title:
            query = query.filter(Book.title.ilike(f"%{title}%"))

        books = query.order_by(Book.title).paginate(page=page, per_page=elements_per_page + 1, error_out=False)
        return jsonify({
            "books": [filtered_book.serialize() for filtered_book in books],
            "metadata":
                {
                    "page": page,
                    "elements_per_page": elements_per_page + 1,
                    "total_elements": books.total
                }
        }), 200

    @app.route('/book/create', methods=['POST'])
    @jwt_required()
    def add_book():
        if not verify_admin_user(get_jwt()):
            return jsonify({"message": "You are not authorized to perform this action"}), 403

        isbn = request.json.get('ISBN')
        title = request.json.get('title')
        author_names = request.json.get('authors', [])
        copies_owned = request.json.get('copies_owned', 0)

        if not isbn or not title or not author_names:
            return jsonify({"message": "Invalid request"}), 400

        if copies_owned == 0:
            return jsonify({"message": "Please use the delete book option"}), 400

        if Book.query.filter_by(ISBN=isbn).first():
            return jsonify({"message": "Book already exists"}), 409
        try:
            new_book = Book(isbn, title, copies_owned)
            db.session.add(new_book)
            db.session.flush()
            for author_name in author_names:
                author = Author.query.filter_by(name=author_name).first()
                if not author:
                    author = Author(name=author_name)
                    db.session.add(author)
                    db.session.flush()

                book_author = BookAuthors(ISBN=new_book.ISBN, author_id=author.id)
                db.session.add(book_author)
            db.session.commit()

            return jsonify({"message": "Book created successfully"}), 201
        except:
            return jsonify({"message": "Internal Server Error, please try again later"}), 500

    @app.route('/book/update', methods=['PUT'])
    @jwt_required()
    def update_book():
        if not verify_admin_user(get_jwt()):
            return jsonify({"message": "You are not authorized to perform this action"}), 403

        isbn = request.json.get('ISBN')
        title = request.json.get('title')
        author_names = request.json.get('authors', [])

        if not isbn or not title or not author_names:
            return jsonify({"message": "Invalid request"}), 400

        copies_owned = request.json.get('copies_owned', 0)

        if copies_owned == 0:
            return jsonify({"message": "Please use the delete book option"}), 400

        current_book = Book.query.filter_by(ISBN=isbn).first()

        if not current_book:
            return jsonify({"message": "The requested book does not exist"}), 404

        try:
            current_book.title = title
            current_book.copies_owned = copies_owned
            new_authors = set(author_names)
            current_authors = set([author.name for author in current_book.authors])

            delete_book_authors(current_authors - new_authors, current_book, db)

            add_book_authors(new_authors - current_authors, current_book, db)

            db.session.commit()
            return jsonify({"message": "Book updated successfully", "book": current_book.serialize()}), 201
        except:
            return jsonify({"message": "Internal Server Error, please try again later"}), 500

    @app.route('/book/delete', methods=['DELETE'])
    @jwt_required()
    def delete_book():
        if not verify_admin_user(get_jwt()):
            return jsonify({"message": "You are not authorized to perform this action"}), 403

        ISBN = request.json.get('ISBN')

        if not ISBN:
            return jsonify({"message": "Invalid request"}), 400

        try:
            book_authors = BookAuthors.query.filter_by(ISBN=ISBN).all()
            db.session.delete(ba for ba in book_authors)
            db.session.delete(Book.query.filter_by(ISBN=ISBN).first())
            db.session.commit()
            return jsonify({"message": "Book deleted successfully"}), 200
        except:
            return jsonify({"message": "Internal Server Error, please try again later"}), 500

    @app.route('/book/get_available_books', methods=['GET'])
    @jwt_required()
    def get_available_books():
        page = request.args.get('page', 1, type=int)
        elements_per_page = request.args.get('elements_per_page', 10, type=int)
        if page < 1 or elements_per_page < 1:
            return jsonify({"message": "Invalid request"}), 400

        books = Book.query.order_by(Book.title).paginate(page=page, per_page=elements_per_page + 1, error_out=False)
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

        return jsonify({
            "books": [book.serialize() for book in available_books],
            "metadata":
                {
                    "page": page,
                    "elements_per_page": elements_per_page + 1,
                    "total_elements": len(available_books)
                }
        }), 200
