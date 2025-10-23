from bookish.db_setup import db

class Book(db.Model):
    __tablename__ = 'Books'

    ISBN = db.Column(db.String(), primary_key=True)
    title=db.Column(db.String())
    book_authors = db.relationship('BookAuthors', back_populates='book')
    copies_owned=db.Column(db.Integer())

    def __init__(self, ISBN, title, copies_owned):
        self.ISBN = ISBN
        self.title = title
        self.copies_owned = copies_owned

    @property
    def authors(self):
        return [ba.author for ba in self.book_authors]

    def __repr__(self):
        return "f<Book {self.ISBN}>"

    def serialize(self):
        return {
            'ISBN': self.ISBN,
            'title': self.title,
            'authors': [author.name for author in self.authors],
            'copies_owned': self.copies_owned
        }
