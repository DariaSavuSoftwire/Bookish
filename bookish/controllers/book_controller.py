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
        elements_per_page = request.args.get('elements_per_page', 3, type=int)
        offset = (page - 1) * elements_per_page
        sorted_books = Book.query.order_by(Book.title).limit(elements_per_page).offset(offset).all()
        return jsonify({"books": [book.serialize() for book in sorted_books]}), 200

    @app.route('/book/create', methods=['POST'])
    @jwt_required()
    def add_book():
        authenticated_user = get_jwt()
        user_role = authenticated_user.get('role')

        if user_role != 'ADMIN':
            return jsonify({"message": "You are not authorized to perform this action"}), 403

        isbn = request.json.get('ISBN')
        title = request.json.get('title')
        author_names = request.json.get('authors', [])
        copies_owned = request.json.get('copies_owned', 0)

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
        except Exception as e:
            return jsonify({"message": str(e)}), 500

    @app.route('/book/update', methods=['PUT'])
    @jwt_required()
    def update_book():
        authenticated_user = get_jwt()
        user_role = authenticated_user.get('role')

        if user_role != 'ADMIN':
            return jsonify({"message": "You are not authorized to perform this action"}), 403

        isbn = request.json.get('ISBN')
        title = request.json.get('title')
        author_names = request.json.get('authors', [])
        copies_owned = request.json.get('copies_owned', 0)
        current_book = Book.query.filter_by(ISBN=isbn).first()

        if not current_book:
            return jsonify({"message": "The requested book does not exist"}), 404

        try:
            current_book.title = title
            current_book.copies_owned = copies_owned
            new_authors = set(author_names)
            current_authors = set([author.name for author in current_book.authors])

            authors_to_remove = current_authors - new_authors
            for author_name in authors_to_remove:
                author = Author.query.filter_by(name=author_name).first()
                if author:
                    book_author = BookAuthors.query.filter_by(ISBN=current_book.ISBN, author_id=author.id).first()
                    if book_author:
                        db.session.delete(book_author)

            authors_to_add = new_authors - current_authors
            for author_name in authors_to_add:
                author = Author.query.filter_by(name=author_name).first()
                if not author:
                    author = Author(name=author_name)
                    db.session.add(author)
                    db.session.flush()
                book_author = BookAuthors(ISBN=current_book.ISBN, author_id=author.id)
                db.session.add(book_author)

            db.session.commit()
            return jsonify({"message": "Book updated successfully"}), 200
        except Exception as e:
            return jsonify({"message": str(e)}), 500

    @app.route('/book/filter', methods=['GET'])
    @jwt_required()
    def filter_books():
        author = request.args.get('author')
        title = request.args.get('title')
        query = Book.query

        if author:
            query = query.join(BookAuthors).join(Author).filter(Author.name.ilike(f"%{author}%"))

        if title:
            query = query.filter(Book.title.ilike(f"%{title}%"))

        books = query.all()
        return jsonify({"books": [filtered_book.serialize() for filtered_book in books]}), 200

    @app.route('/book/get_available_books', methods=['GET'])
    @jwt_required()
    def get_available_books():
        page = request.args.get('page', 1, type=int)
        elements_per_page = request.args.get('elements_per_page', 10, type=int)
        offset = (page - 1) * elements_per_page
        books = Book.order_by(Book.title).limit(elements_per_page).offset(offset).all()
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
