from flask import Flask, g
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, current_user
from flask_mail import Mail

import const

app = Flask(__name__)

app.config.from_envvar('REPORTER_LOCAL_SETTINGS', silent=True)

db = SQLAlchemy(app)
mail = Mail(app)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "index"

import views
import models


@login_manager.user_loader
def load_user(id):
    return models.User.query.get(int(id))

@app.before_request
def before_request():
    g.user = current_user

@app.template_filter('situationmap')
def situationmap(situation):
    try:
        return const.SITUATION_MAP[situation]
    except KeyError:
        return const.SITUATION_MAP['other']


if __name__ == '__main__':
    app.run()
