import datetime

from flask import request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, get_jwt

from bookish.controllers.utils import verify_admin_user
from bookish.models.user import User
from bookish.models import db, Book, BookLoan, BookAuthors, Author
from bookish.models.user_role import Role


def user_routes(app):
    @app.route('/user/add_user', methods=['POST'])
    @jwt_required()
    def add_user():
        if not verify_admin_user(get_jwt()):
            return jsonify({"message": "You are not authorized to perform this action"}), 403

        username = request.json.get('username')
        name = request.json.get('name')
        password = request.json.get('password')
        role = request.json.get('role')
        user = User(username, name)
        user.set_password(password)
        user.set_role(role)

        try:
            db.session.add(user)
            db.session.commit()
            return jsonify({"message": "User added successfully"}), 201
        except Exception as e:
            app.logger.error(e)
            return jsonify({"message": "Internal Server Error, please try again later"}), 500

    @app.route('/user/register', methods=['POST'])
    def register():
        username = request.json.get('username')
        name = request.json.get('name')
        password = request.json.get('password')

        if User.query.filter_by(username=username).first():
            return jsonify({"message": "Username already exists"}), 409

        new_user = User(username, name)
        new_user.set_password(password)
        new_user.set_role(Role.USER)

        try:
            db.session.add(new_user)
            db.session.commit()
            role_claim = {"role": "USER"}
            token = create_access_token(identity=new_user.username, additional_claims=role_claim)
            return jsonify({"message": "User created successfully", "token": token, "role": new_user.role.name}), 201
        except Exception as e:
            app.logger.error(e)
            return jsonify({"message": "Internal Server Error, please try again later"}), 500

    @app.route('/user/login', methods=['POST'])
    def login():
        username = request.json.get('username')
        password = request.json.get('password')
        user = User.query.filter_by(username=username).first()

        if not user or not user.check_password(password):
            return jsonify({"message": "Username or password is incorrect"}), 400

        token = create_access_token(identity=user.username, additional_claims={"role": user.role.name})
        return jsonify({"message": "User logged in successfully", "token": token, "role": user.role.name}), 201

    @app.route('/user/loan', methods=['POST'])
    @jwt_required()
    def loan():
        username = get_jwt_identity()
        ISBN = request.json.get('ISBN')
        duration = request.json.get('duration')

        user = User.query.filter_by(username=username).first()
        if not user:
            return jsonify({"message": "Authentication has expired "}), 401

        book = Book.query.filter_by(ISBN=ISBN).first()
        if not book:
            return jsonify({"message": "Book does not exist"}), 400

        borrowed_copies = BookLoan.query.filter_by(ISBN=book.ISBN).all()
        available_copies = book.copies_owned - len(borrowed_copies)

        if available_copies < 1:
            return jsonify({"message": "You are not authorized to perform this action"}), 403

        borrowed_on = datetime.datetime.now()
        due_return = borrowed_on + datetime.timedelta(days=int(duration))
        book_loan = BookLoan(ISBN=ISBN, username=username, borrowed_on=borrowed_on.strftime("%Y-%m-%d"),
                             due_return=due_return.strftime("%Y-%m-%d"))
        try:
            db.session.add(book_loan)
            db.session.commit()
            return jsonify({"message": "Book loan created successfully"}), 201
        except Exception as e:
            app.logger.error(e)
            return jsonify({"message": "Internal Server Error, please try again later"}), 500

    @app.route('/user/return_book', methods=['PUT'])
    @jwt_required()
    def return_book():
        username = get_jwt_identity()
        isbn = request.json.get('ISBN')
        return_date = request.json.get('return_date')

        if not isbn or not return_date:
            return jsonify({"message": "Invalid request"}), 400
        try:
            book_loan = BookLoan.query.filter(BookLoan.username == username).filter(BookLoan.ISBN == isbn).filter(
                BookLoan.due_return == return_date).first()

            db.session.delete(book_loan)
            db.session.commit()
            return jsonify({"message": "Book returned successfully"}), 200

        except Exception as e:
            app.logger.error(e)
            return jsonify({"message": "Internal Server Error, please try again later"}), 500

    @app.route('/user/get_loaned_books', methods=['GET'])
    @jwt_required()
    def get_loaned_books():
        username = get_jwt_identity()

        author = request.args.get('author')
        title = request.args.get('title')

        page = request.args.get('page', 1, type=int)
        elements_per_page = request.args.get('elements_per_page', 10, type=int)
        if page < 1 or elements_per_page < 1:
            return jsonify({"message": "Both page and number of elements per page should be greater than 0"}), 400

        query = BookLoan.query
        query = query.join(Book, BookLoan.ISBN == Book.ISBN)
        query = query.filter(BookLoan.username == username)
        if author:
            query = query.join(BookAuthors, Book.ISBN == BookAuthors.ISBN).join(Author).filter(
                Author.name.ilike(f"%{author}%"))

        if title:
            query = query.filter(Book.title.ilike(f"%{title}%"))

        query = query.order_by(Book.title)
        no_of_books = query.count()
        loaned_books = query.paginate(page=page, per_page=elements_per_page, error_out=False).items

        return jsonify({
            "books": [book.serialize() for book in loaned_books],
            "metadata":
                {
                    "page": page,
                    "elements_per_page": elements_per_page,
                    "total_elements": no_of_books
                }
        }), 200
