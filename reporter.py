from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config.from_envvar('REPORTER_LOCAL_SETTINGS', silent=True)

db = SQLAlchemy(app)

import views

if __name__ == '__main__':
    app.run()
