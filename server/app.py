from flask import request, session, make_response
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

from config import app, db, api
from models import User

class Users(Resource):
    def get(self):
        users = [u.to_dict() for u in User.query.all()]
        return make_response(users,201)

api.add_resource(Users,'/users')

if __name__ == '__main__':
    app.run(port=5555, debug=True)