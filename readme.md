
# README
## Overview: 


# App Flow
![Rough Flowchart](readme/AppFlowLayout.JPG)

# Database Architecture
![Rough Flowchart](readme/erd.JPG)

# Setup

mkdir preject

## Client setup
- At root:
- npx create-react-app client
- npm install react-router-dom@6


## Server setup

- At root
- pipenv install Flask gunicorn psycopg2-binary Flask-SQLAlchemy Flask-Migrate SQLAlchemy-Serializer Flask-RESTful faker Flask-Bcrypt python-dotenv
- creates Pipfile and Piplock
- pipenv requirements > requirements.txt


## Initial Launch Commands 
- Connect to GitHub repository

## Activating Pipenv (python code)
- pipenv shell

## Local running
### Starting the NPM server for the app to run on
- npm start --prefix client

### Starting the backend server
- python server/app.py
- python server/seed.py (as applicable)
## Connect to git

## Set Proxy
Set Proxy in client/package.json to   "proxy": "http://localhost:5555",

# Useful Resources
- Routes v6 https://github.com/learn-co-curriculum/react-hooks-react-router-code-along-v6/blob/master/src/components/UserCard.js
- Tailwind CSS https://flowbite.com/docs/components/card/
- https://formik.org/docs/overview
- Useful Tailwind CSS https://flowbite.com/docs/components/forms/
- https://tailwindcss.com/