from flask import render_template, request, redirect, url_for

from reporter import app

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        return redirect(url_for('report'))
    else:
        return redirect(url_for('index'))

@app.route('/report/')
def report():
    return render_template('report.html')

@app.errorhandler(404)
def page_not_found(error):
    return redirect(url_for('index'))
