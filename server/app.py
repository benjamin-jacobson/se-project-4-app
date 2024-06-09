from flask import request, session, make_response
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

from config import app, db, api
from models import User, Friend

# @app.before_request
# def check_if_logged_in():
#     open_access_list = [
#         'signup',
#         'login',
#         'check_session'
#     ]

#     if (request.endpoint) not in open_access_list and (not session.get('user_id')):
#         return {'error': '401 Unauthorized, not logged in'}, 401

class ClearSession(Resource):

    def delete(self):
    
        session['user_id'] = None
        session['session'] = None

        return {}, 204

class Signup(Resource):

    def post(self):
        
        username = request.get_json()['username']
        password = request.get_json()['password']

        if username and password:
            
            new_user = User(username=username)
            new_user.password_hash = password
            db.session.add(new_user)
            db.session.commit()

            session['user_id'] = new_user.id
            return new_user.to_dict(), 201

        return {'error': '422 Unprocessable Entity'}, 422

class CheckSession(Resource):
    def get(self):
        
        user_id = session.get('user_id',None)
        if user_id:
            user = User.query.filter(User.id == user_id).first()
            return user.to_dict(), 200
        return {}, 401

class Login(Resource):
    def post(self):
        username = request.get_json()['username']
        password = request.get_json()['password']
        user = User.query.filter(User.username == username).first()
        print(f'=========checking user {user}')
        if user:
            if user.authenticate(password):
                session['user_id'] = user.id
                return user.to_dict(), 200
            else:
                return {'error': '401 Unauthorized'}, 401
        return {'error': '401 Unauthorized User None'}, 401

class Logout(Resource):
    def delete(self):
        if session.get('user_id'):
            session['user_id'] = None
        return {"message": "204: Logged out successfully"}, 204


class Users(Resource):
    def get(self):
        users = [u.to_dict() for u in User.query.all()]
        return make_response(users,201)

class Friends(Resource):
    def get(self):
        user = User.query.filter(User.id == session['user_id']).first()
        friends = [f.to_dict() for f in user.friends]
        return make_response(friends,201)
    def post(self):
        data = request.get_json()
    
        name = data['name']
        favorite_color = data['favorite_color']

        try:
            new_friend = Friend(
                name = name,
                favorite_color = favorite_color,
                user_id=session['user_id'],
            )

            db.session.add(new_friend)
            db.session.commit()

        except IntegrityError:
            return {'error': '422 Unprocessable Entity'}, 422
        
        return make_response(new_friend.to_dict(), 201)

class FriendById(Resource):
    def get(self, id):
        response_dict = Friend.query.filter_by(id=id).first().to_dict()
        response = make_response(response_dict,200,)
        return response
    
    def delete(self, id):
        record = Friend.query.filter_by(id=id).first()
        db.session.delete(record)
        db.session.commit()
        response_dict = {"message": "Record successfully deleted"}

        response = make_response(response_dict, 200)
        return response

    def patch(self, id):
        record = Friend.query.filter_by(id=id).first()
        for attr in request.form:
            setattr(record, attr, request.form[attr])

        db.session.add(record)
        db.session.commit()

        response_dict = record.to_dict()

        response = make_response(response_dict, 200 )
        return response

api.add_resource(ClearSession, '/clear', endpoint='clear')
api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')

api.add_resource(Users, '/users', endpoint='users')

api.add_resource(Friends, '/friends', endpoint='friends')
api.add_resource(FriendsByID, '/friends/<int:id>')


if __name__ == '__main__':
    app.run(port=5555, debug=True)