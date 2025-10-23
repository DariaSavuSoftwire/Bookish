from flask import request
from flask_jwt_extended import jwt_required
from bookish.models import Author
from bookish.models import db


def author_routes(app):
    @app.route('/author/get_all', methods=['GET'])
    @jwt_required()
    def get_all_books():
        return {"books": Author.query.all()}

    @app.route('/author/add', methods=['POST'])
    @jwt_required()
    def add_author():
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
