from bookish.db_setup import db

class Author(db.Model):
    __tablename__ = 'Authors'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    book_authors = db.relationship('BookAuthors', back_populates='author')

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return f"<Authors: ${self.name}>"

    def serialize(self):
        return {
            'name': self.name
        }
