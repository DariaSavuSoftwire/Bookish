from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt

from bookish.controllers.utils import verify_admin_user
from bookish.models import Author
from bookish.models import db

def author_routes(app):
    @app.route('/author/get_all', methods=['GET'])
    @jwt_required()
    def get_all_authors():
        return {"books": Author.query.all()}, 200

    @app.route('/author/add', methods=['POST'])
    @jwt_required()
    def add_author():
        if not verify_admin_user(get_jwt()):
            return jsonify({"message": "You are not authorized to perform this action"}), 403

        name = request.json.get('name')

        if Author.query.filter_by(name=name).first():
            return jsonify({"message": "Author already exists"}), 409

        author = Author(name=name)
        try:
            db.session.add(author)
            db.session.commit()
            return jsonify({"message": "Author created"}), 201
        except Exception as e:
            app.logger.error(e)
            return jsonify({"message": "Internal Server Error, please try again later"}), 500
