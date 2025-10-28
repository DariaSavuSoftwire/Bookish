import datetime

from flask import request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, get_jwt

from bookish.controllers.utils import verify_admin_user
from bookish.models.user import User
from bookish.models import db, Book, BookLoan
from bookish.models.user_role import Role

def user_routes(app):
    @app.route('/user/add_user')
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

    @app.route('/user/get_loaned_books', methods=['GET'])
    @jwt_required()
    def get_loaned_books():
        username = get_jwt_identity()
        loaned_books = BookLoan.query.filter_by(username=username).all()
        return jsonify({"loaned_books": [loaned_book.serialize() for loaned_book in loaned_books]}), 200
