from flask import request, jsonify
from flask_jwt_extended import create_access_token
from bookish.models.user import User
from bookish.models import db

def user_routes(app):
    @app.route('/user/healthcheck')
    def health_check_user():
        return {"status": "OK"}

    @app.route('/user/register', methods=['POST'])
    def register():
        username = request.json.get('username')
        name = request.json.get('name')
        password = request.json.get('password')

        if User.query.filter_by(username=username).first():
            return jsonify({"msg": "Username already exists"}), 400

        try:
            new_user = User(username, name)
            new_user.set_password(password)
            db.session.add(new_user)
            db.session.commit()
            token = create_access_token(identity=new_user.username)
            return jsonify({"msg": "User created successfully", "token": token}), 201
        except Exception as e:
            return jsonify({"msg": str(e)}), 500

    @app.route('/user/login', methods=['POST'])
    def login():
        username = request.json.get('username')
        password = request.json.get('password')
        user=User.query.filter_by(username=username).first()

        if not user:
            return jsonify({"msg": "Username is invalid"}), 400

        if not user.check_password(password):
            return jsonify({"msg": "Incorrect password"}), 400

        token = create_access_token(identity=user.username)
        return jsonify({"msg": "User logged in successfully", "token": token}), 201
        return jsonify({"msg": str(e)}), 500
