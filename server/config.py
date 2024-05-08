import Flask
from flask_bcrypt import bcrypt
from flask_migrate import flask_migrate
from flask_restful import Api
from flask_sql_alchemy import sqlalchemy_serializer
from sqlalchemy import MetData # what do?

app = Flask(__name__)

# TODO setup imports