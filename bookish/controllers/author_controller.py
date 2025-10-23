from flask import request, jsonify
from flask_jwt_extended import jwt_required,get_jwt
from bookish.models import Author
from bookish.models import db


def author_routes(app):
    @app.route('/author/get_all', methods=['GET'])
    @jwt_required()
    def get_all_authors():
        return {"books": Author.query.all()}

    @app.route('/author/add', methods=['POST'])
    @jwt_required()
    def add_author():
        role=get_jwt().get('role')

        if role!= "ADMIN":
            return jsonify({"msg": "You are not authorized to perform this action"}), 400

        name = request.json.get('name')

        if Author.query.filter_by(name=name).first():
            return {"message": "Author already exists"}

        author = Author(name=name)
        try:
            db.session.add(author)
            db.session.commit()
            return {"message": "Author created"}
        except Exception as e:
            return {"message": str(e)}
