import os
from flask import Flask
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from dotenv import load_dotenv

load_dotenv('server/secrets.env')

app = Flask(__name__)
app.secret_key = os.getenv('FLASK_APP_SECRET_KEY')
x = os.getenv('FLASK_APP_SECRET_KEY')
# print(f'FLASK_APP_SECRET_KEY: {x}')
# app.secret_key = b'Y\xf1Xz\x00\xad|eQ\xzvbzvb80t \xca\x1a\x10K' #TODO delete 
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False # TODO what do?

metadata = MetaData(naming_convention={"fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",}) # TODO what do?

db = SQLAlchemy(metadata=metadata)
migrate = Migrate(app,db)
db.init_app(app) # TODO what do?

bcrypt = Bcrypt(app)
api = Api(app)