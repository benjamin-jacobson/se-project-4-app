from random import randint, choice
from faker import Faker

from app import app
from models import db, User



with app.app_context():

    User.query.delete()

    fake = Faker()

    # make sure users have unique usernames
    users = []
    usernames = []

    samples = 5
    for i in range(samples):
        username = fake.first_name()

        # Getting a unique username
        while username in usernames:
            username = fake.first_name()
        usernames.append(username)

        user = User(
            username = username
        )

        users.append(user)

        db.session.add_all(users)
        db.session.commit()