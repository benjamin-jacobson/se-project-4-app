# from sqlalchemy.ext.hybrid import hybrid_property
# from sqlalchemy_serializer import SerializerMixin

# from config import db, bcrypt

# class User(db.Model, SerializerMixin):
#     __tablename__ = 'users'

#     id = db.Column(db.Integer, primary_key = True)
#     username = db.Column(db.String, unique = True, nullable = False)
#     _password_hash = db.Column(db.String)

#     def __repr__(self):
#         return f'<id: {id}, username: {username}>'

from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin

from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-friends.user', '-_password_hash',)

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String)

    @hybrid_property
    def password_hash(self):
        raise Exception('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

    def __repr__(self):
        return f'User {self.username}, ID: {self.id}'

    # relationships 
    friends = db.relationship('Friend', backref='user')

class Friend(db.Model, SerializerMixin):
    __tablename__ = "friends"

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False)
    birthday = db.Column(db.Date, nullable = True)
    favorite_color = db.Column(db.String, nullable = True)

    user_id = db.Column(db.Integer(), db.ForeignKey('users.id'))