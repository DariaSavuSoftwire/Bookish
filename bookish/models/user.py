from bookish.db_setup import db
from bookish.models.user_role import Role
from werkzeug.security import check_password_hash, generate_password_hash


class User(db.Model):
    __tablename__ = 'Users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(),unique=True)
    name = db.Column(db.String())
    password = db.Column(db.String())
    role = db.Column(db.Enum(Role))

    def __init__(self, username, name):
        self.username = username
        self.name = name

    def __repr__(self):
        return f"<User {self.username}>"

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def serialize(self):
        return {
            'username': self.username,
            'name': self.name,
        }
