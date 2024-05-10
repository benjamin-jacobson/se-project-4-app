
# README

mkdir preject

# Client setup
- At root:
- npx create-react-app client
- npm install react-router-dom@6


# Server setup

- At root
- pipenv install Flask gunicorn psycopg2-binary Flask-SQLAlchemy Flask-Migrate SQLAlchemy-Serializer Flask-RESTful faker Flask-Bcrypt python-dotenv
- creates Pipfile and Piplock
- pipenv requirements > requirements.txt


# Initial Launch Commands 
- Connect to GitHub repository
# Activating Pipenv (python code)
- pipenv shell

# Local running
## Starting the NPM server for the app to run on
- npm start --prefix client

## Starting the backend server
- python server/app.py


# connect to git

- 
Set Proxy  in client/package.json to   "proxy": "http://localhost:5555",

# Next Step
- run command locals for app (not Honcho)
- clean the client folder to a basic app
- set config for proxy
- server config setup

- clean client/public/index.htlm



# Useful Resources
- Routes v6 https://github.com/learn-co-curriculum/react-hooks-react-router-code-along-v6/blob/master/src/components/UserCard.js