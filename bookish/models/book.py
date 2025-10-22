from bookish.app import db
from bookish.models.book_authors import BookAuthors


class Book(db.Model):
    __tablename__ = 'Books'

    ISBN = db.Column(db.String(), primary_key=True)
    title=db.Column(db.String())
    authors = db.relationship('Author', secondary=BookAuthors, back_populates='books')
    copies_owned=db.Column(db.Integer())

    def __init__(self, ISBN, title, authors, copies_owned):
        self.ISBN = ISBN
        self.title = title
        self.authors = authors
        self.copies_owned = copies_owned

    def __repr__(self):
        return "f<Book {self.ISBN}>"

    def serialize(self):
        return {
            'ISBN': self.ISBN,
            'title': self.title,
            'authors': self.authors,
            'copies_owned': self.copies_owned
        }
