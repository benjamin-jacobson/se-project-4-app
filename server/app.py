from flask import request, session, make_response
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

from config import app, db, api
from models import User, Friend, Activity, Meeting
from datetime import datetime

import os
from openai import OpenAI
from dotenv import load_dotenv

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
        print(f'hecking user {user}')
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

# class ManyMeetups(Resource):
#     def get(self,num):
#         user = User.query.filter(User.id == session['user_id']).first()
#         friends_subset = [f.to_dict() for f in user.friends if len(f.meetings) >= num]
#         return make_response(friends_subset,201)
# api.add_resource(ManyMeetups, endpoint='/many_meetups/<int:num>')

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
        data = request.get_json()
        for attr in data:
            if attr == 'birthday':
                try:
                    # Assuming the birthday is in 'YYYY-MM-DD' format
                    birthday = datetime.strptime(data[attr], '%Y-%m-%d').date()
                    setattr(record, attr, birthday)
                except ValueError:
                    return make_response({"error": "Invalid date format. Expected 'YYYY-MM-DD'."}, 400)
            else:
                setattr(record, attr, data[attr])

        db.session.add(record)
        db.session.commit()

        response = make_response(record.to_dict(), 200 )
        return response

class Meetups(Resource):
    def get(self):
        # user = Meetups.query.filter(User.id == session['user_id']).first()
        m = Meeting.query.all()
        meetups = [f.to_dict() for f in m]
        return make_response(meetups,201)

    def post(self): 
        
        date_str = request.json["date"]
        date_obj = datetime.fromisoformat(date_str)

        try:
            meetup = Meeting(
                date= date_obj,
                friend_id = request.json["friend_id"],
                activity_id = request.json["activity_id"]
            )
            
            db.session.add(meetup)
            db.session.commit()
            
            # return meetup.activity.to_dict(), 201
            return meetup.to_dict(), 201
        
        except:
            return {"error": "400: Validation error"}, 400
class MeetupsById(Resource):
    def get(self, id):
        response_dict = Meeting.query.filter_by(id=id).first().to_dict()
        response = make_response(response_dict,200,)
        return response
    
    def delete(self, id):
        record = Meeting.query.filter_by(id=id).first()
        db.session.delete(record)
        db.session.commit()
        response_dict = {"message": "Record successfully deleted"}

        response = make_response(response_dict, 200)
        return response


class Activities(Resource):
    def get(self):
        activities = [u.to_dict() for u in Activity.query.all()] 
        return make_response(activities,201)

    def post(self): 

        try:
            activity = Activity(
                name= request.json["name"],
                location = request.json["location"],
                type = request.json["type"]
            )
            
            db.session.add(activity)
            db.session.commit()
            
            return activity.to_dict(), 201
        except:
            return {"error": "400: Validation error"}, 400

def get_openai_response(prompt,api_key):
    max_retries = 5
    backoff_time = 1  # initial backoff time in seconds
    client = OpenAI(api_key=api_key)

    for i in range(max_retries):
        try:
            completion = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=150,  # Adjust the token limit as needed
                temperature=0.7  # Adjust the temperature for randomness; 0.7 is a good default
            )
            return completion.choices[0].message.content #['content'].strip()
        except Exception as e:
            print(f"An error occurred: {e}")
            break

    return "Error: Unable to get response from OpenAI."

class ChatGpt(Resource):
    '''Implementation of chatgpt, using secrets.env variable'''
    def post(self): 
        load_dotenv('secrets.env')
        api_key = os.getenv('CHATGPT_SECRET_KEY')

        try:
            user_prompt = request.json['user_input']
            chatgpt_response = get_openai_response(user_prompt,api_key)
            out = {"content":f'{chatgpt_response}'}
            return out, 201
        except:
            return {"error": "400: Validation error"}, 400

# api.add_resource(ManyMeetups, '/many_meetups/<int:num>' ,endpoint='/many_meetups/<int:num>')
api.add_resource(ChatGpt, '/chatbot', endpoint='chatbot')
api.add_resource(Activities, '/activities', endpoint='activities')
api.add_resource(Meetups, "/meetups", endpoint='meetups') 
api.add_resource(ClearSession, '/clear', endpoint='clear')
api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')

api.add_resource(Users, '/users', endpoint='users')

api.add_resource(Friends, '/friends', endpoint='friends')
api.add_resource(FriendById, '/friends/<int:id>')
api.add_resource(MeetupsById, '/meetups/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)


# @app.before_request
# def check_if_logged_in():
#     open_access_list = [
#         'signup',
#         'login',
#         'check_session'
#     ]

#     if (request.endpoint) not in open_access_list and (not session.get('user_id')):
#         return {'error': '401 Unauthorized, not logged in'}, 401





load_dotenv('server/secrets.env')
app.secret_key = os.getenv('FLASK_APP_SECRET_KEY')