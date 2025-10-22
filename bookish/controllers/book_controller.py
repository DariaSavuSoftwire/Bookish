from bookish.models import db
from bookish.models.book import Book
from bookish.models import db

def book_routes(app):
    @app.route('/book/healthcheck')
    def health_check_book():
        return {"status": "OK"}
