from random import randint, choice
from faker import Faker
from datetime import datetime

from app import app
from models import db, Friend, Meeting, friend_meetings
from models import User


with app.app_context():

    User.query.delete()
    Friend.query.delete()
    Meeting.query.delete()

    fake = Faker()

    # Adding Friends
    test_color_options = ['red','yellow','blue']
    friends_list = []
    for i in range(20):

        dob_str = fake.date_of_birth().isoformat()
        
        friend = Friend(
            user_id = randint(1,5), # for only user ids 1-5
            name = fake.name(),
            birthday = datetime.strptime(dob_str, '%Y-%m-%d').date(), # datetime not string
            favorite_color = choice(test_color_options) # randomly choose a color from above
            
        )
        friends_list.append(friend)
    db.session.add_all(friends_list)
    db.session.commit()

    # Adding meetings
    m1 = Meeting(location="Zoo",
                 scheduled_time=datetime(2024, 6, 11, 9, 30),
                 type="get together")
    m2 = Meeting(type="phone call",
                 scheduled_time=datetime(2024, 6, 12, 15, 15),
                 location="Virtual")
    db.session.add_all([m1, m2])
    db.session.commit()