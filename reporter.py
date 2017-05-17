from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager

app = Flask(__name__)

app.config.from_envvar('REPORTER_LOCAL_SETTINGS', silent=True)

db = SQLAlchemy(app)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "index"

import views
import models


@login_manager.user_loader
def load_user(id):
    return models.User.query.get(int(id))

if __name__ == '__main__':
    app.run()
