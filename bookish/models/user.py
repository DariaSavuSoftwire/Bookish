from bookish.app import db
from bookish.models.user_role import Role


class User(db.Model):
    __tablename__ = 'Users'

    id = db.Column(db.Integer, db.Sequence('user_id_seq'), primary_key=True)
    username = db.Column(db.String())
    name = db.Column(db.String())
    password = db.Column(db.String())
    role = db.Column(db.Enum(Role))

    def __init__(self, username, name):
        self.username = username
        self.name = name

    def __repr__(self):
        return f"<User {self.username}>"

    def serialize(self):
        return {
            'username': self.username,
            'name': self.name,
        }
