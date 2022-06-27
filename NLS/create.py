from flask import Flask
from config import secret_key, stripe_keys
from flask_sqlalchemy import SQLAlchemy

def create_app(config_file = 'config.py'):
    app = Flask(__name__)  
    app.config.from_pyfile(config_file)
    #app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///data.db"
    app.secret_key = secret_key
    #db = SQLAlchemy(app)
    #db.create_all()
    return app , stripe_keys
