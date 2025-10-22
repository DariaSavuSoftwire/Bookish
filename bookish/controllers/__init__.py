from bookish.controllers.bookish import bookish_routes
from bookish.controllers.user_controller import user_routes
from bookish.controllers.book_controller import book_routes


def register_controllers(app):
    user_routes(app)
    book_routes(app)