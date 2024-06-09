from random import randint, choice
from faker import Faker
from datetime import datetime

from app import app
from models import db, Friend #User



with app.app_context():

    Friend.query.delete()

    fake = Faker()

    test_color_options = ['red','yellow','blue']
    friends_list = []
    for i in range(5):

        dob_str = fake.date_of_birth().isoformat()
        
        friend = Friend(
            user_id = 1,
            name = fake.name(),
            birthday = datetime.strptime(dob_str, '%Y-%m-%d').date(), # datetime not string
            # birthday = fake.date_of_birth(minimum_age=18, maximum_age=65).
            favorite_color = choice(test_color_options) # randomly choose a color from above
            
        )

        friends_list.append(friend)

    db.session.add_all(friends_list)
    
    db.session.commit()