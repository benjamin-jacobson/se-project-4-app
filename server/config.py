import Flask
from flask_bcrypt import bcrypt
from flask_migrate import flask_migrate
from flask_restful import Api
from flask_sql_alchemy import sqlalchemy_serializer
from sqlalchemy import MetData # TODO what do?

app = Flask(__name__)

# TODO setup imports

# app.secret_key = b'Y\xf1Xz\x00\xad|eQ\x80t \xca\x1a\x10K' #TODO where come from
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False # TODO what do?

metadata = MetaData(naming_convention={"fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",}) # TODO what do?

db = SQLAlchemy(metadata=metadata)
migrate = Migrate(app,db)
db.init_app(app) # TODO what do?

bcryp = Bcrypt(app)
api = Api(app)