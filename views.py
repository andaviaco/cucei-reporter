# coding=utf-8

from flask import render_template, request, redirect, url_for, flash, jsonify
from flask_login import login_user, logout_user, login_required, current_user
from flask_mail import Message

import const
from reporter import app, mail
from models import User


@app.route('/')
def index():
    if current_user.is_authenticated:
        return redirect(url_for('report'))
    return render_template('index.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        code = request.form.get('code')
        nip = request.form.get('password', None)
        user = User.query.filter_by(code=code).first()

        # NIP is the last 4 characters of the code (requested by client)
        if user is not None and nip:
            if code.endswith(nip, -(const.NIP_LEN)):
                login_user(user)
                flash(u'Logged in successfully', 'success')
                return redirect(url_for('report'))

        flash(u'El código y/o el NIP son inválidos' , 'error')
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

        try:
            priority = const.PRIORITY_MAP[data.get('priority')]
        except KeyError:
            priority = const.PRIORITY_MAP['low']

        try:
            priority = const.PRIORITY_MAP[data.get('priority')]
        except KeyError:
            priority = const.PRIORITY_MAP['low']

        send_email(
            name=current_user.name,
            major=data.get('major'),
            nrc=data.get('nrc'),
            subjectkey=data.get('subjectkey'),
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
    msg_subject = u'[{}] Reporte de Estado Académico'.format(data['priority'])
    msg = Message(msg_subject,
        recipients=[app.config['MAIL_DEFAULT_RECIPIENT']],
        html=render_template('email.html', **data)
    )

    mail.send(msg)
