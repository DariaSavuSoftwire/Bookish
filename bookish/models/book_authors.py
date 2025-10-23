from bookish.db_setup import db

class BookAuthors(db.Model):
    __tablename__ = 'BookAuthors'

    id = db.Column(db.Integer, primary_key=True)
    ISBN = db.Column(db.String(), db.ForeignKey('Books.ISBN'))
    author_id = db.Column(db.Integer, db.ForeignKey('Authors.id'))

    book = db.relationship('Book', back_populates='book_authors')
    author = db.relationship('Author', back_populates='book_authors')

    def __init__(self, ISBN, author_id):
        self.ISBN = ISBN
        self.author_id = author_id

    def __repr__(self):
        return f"<BookAuthors ISBN: ${self.ISBN} author: ${self.author_id}>"

    def serialize(self):
        return {
            'ISBN': self.ISBN,
            'author_id': self.author_id
        }
