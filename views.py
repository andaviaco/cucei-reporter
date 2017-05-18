from flask import render_template, request, redirect, url_for, flash, jsonify
from flask_login import login_user, logout_user, login_required, current_user
from flask_mail import Message

from reporter import app, mail
from models import User

PRIORITY_MAP = {
    'low': 'baja',
    'medium': 'media',
    'high': 'alta',
}

@app.route('/')
def index():
    if current_user.is_authenticated:
        return redirect(url_for('report'))
    return render_template('index.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        code = request.form.get('password')
        user = User.query.filter_by(code=code).first()

        if user is not None:
            login_user(user)
            flash('Logged in successfully')
            return redirect(url_for('report'))

        flash('Password is invalid' , 'error')
        return redirect(url_for('index'))
    else:
        return redirect(url_for('index'))

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('index'))

@app.route('/report', methods=['GET', 'POST'])
@login_required
def report():
    if request.method == 'POST':
        data = request.get_json()
        priority = PRIORITY_MAP[data.get('priority')]

        send_email(
            name=current_user.name,
            nrc=data.get('nrc'),
            key=data.get('key'),
            section=data.get('section'),
            subject=data.get('subject'),
            priority=priority.upper(),
            students=data.get('students')
        )

        return jsonify({
            'message': 'success'
        }), 201

    else:
        return render_template('report.html')

@app.errorhandler(404)
def page_not_found(error):
    return redirect(url_for('index'))


def send_email(**data):
    msg_subject = '[{}] Reporte de Profesor'.format(data['priority'])
    msg = Message(msg_subject,
        recipients=[app.config['MAIL_DEFAULT_RECIPIENT']],
        html=render_template('email.html', **data)
    )

    mail.send(msg)
