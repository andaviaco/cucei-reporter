from flask import Flask

app = Flask(__name__)

app.config.from_envvar('REPORTER_LOCAL_SETTINGS', silent=True)

import views

if __name__ == '__main__':
    app.run()
