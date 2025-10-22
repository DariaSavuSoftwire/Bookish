from bookish.models import db
from bookish.models.book_authors import BookAuthors


class Author(db.Model):
    __tablename__ = 'Authors'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    books = db.relationship('Book', secondary=BookAuthors, back_populates='authors')

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return f"<Author {self.name}>"

    def serialize(self):
        return {
            'name': self.name,
        }