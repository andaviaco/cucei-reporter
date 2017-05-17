from flask import render_template, request, redirect, url_for, flash
from flask_login import login_user, login_required, current_user

from reporter import app
from models import User

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

@app.route('/report', methods=['GET', 'POST'])
@login_required
def report():
    if request.method == 'POST':
        print(request.form)
        return render_template('report.html')
    else:
        return render_template('report.html')

@app.errorhandler(404)
def page_not_found(error):
    return redirect(url_for('index'))
