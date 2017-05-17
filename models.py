from flask_sqlalchemy import SQLAlchemy

from reporter import db

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    code = db.Column(db.String(7), unique=True, index=True)
    name = db.Column(db.Unicode, index=True)
    degree = db.Column(db.String(2))

    def __init__(self, code, name, degree):
        self.code = code
        self.name = name
        self.degree = degree

    def __repr__(self):
        return u'<User {} {}>'.format(self.code, self.name).encode('utf8')

    def __unicode__(self):
        return u'<User {} {}>'.format(self.code, self.name)
