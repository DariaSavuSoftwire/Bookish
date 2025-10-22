from bookish.app import db


class BookLoan(db.Model):
    __tablename__ = 'BookLoans'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(), db.ForeignKey('users.username'))
    ISBN = db.Column(db.String(), db.ForeignKey('books.ISBN'))
    borrowed_on = db.Column(db.String())
    due_return = db.Column(db.String())

    user = db.relationship("User", backref="borrowed_books")
    book = db.relationship("Book", backref="borrowed_by")

    def __init__(self, username, ISBN, borrowed_on, due_return):
        self.username = username
        self.ISBN = ISBN
        self.borrowed_on = borrowed_on
        self.due_return = due_return

    def __repr__(self):
        return f"<Book loaned> ${self.ISBN} ${self.username}"

    def serialize(self):
        return {
            'ISBN': self.ISBN,
            'username': self.username,
            'borrowed_on': self.borrowed_on,
            'due_return': self.due_return
        }
