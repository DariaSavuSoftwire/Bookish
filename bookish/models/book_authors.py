from bookish.app import db

class BookAuthors(db.Model):
    __tablename__ = 'BookAuthors'

    id = db.Column(db.Integer, primary_key=True)
    ISBN = db.Column(db.String(), db.ForeignKey('books.ISBN'))
    author_id = db.Column(db.Integer, db.ForeignKey('authors.id'))

    def __init__(self, ISBN, author_id):
        self.ISBN = ISBN
        self.author_id = author_id

    def __repr__(self):
        return "f<BookAuthors ISBN: {self.ISBN} author: {self.author_id}>"

    def serialize(self):
        return {
            'ISBN': self.ISBN,
            'author_id': self.author_id
        }