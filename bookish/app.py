import os
from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from bookish.db_setup import db, migrate
from bookish.controllers import register_controllers
from bookish.models import User

jwt = JWTManager()

def create_app():
    app = Flask(__name__)

    app.config.from_object(os.environ['APP_SETTINGS'])
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY']=os.environ['JWT_SECRET_KEY']

    db.init_app(app)
    migrate.init_app(app, db)

    register_controllers(app)

    jwt.init_app(app)
    CORS(app)
    print()

    if __name__ == "__main__":
        app.run()


    return app
