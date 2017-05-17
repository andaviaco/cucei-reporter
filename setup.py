# coding=utf-8

from setuptools import setup

setup(
    name='cucei-reporter',
    version='0.0.1',
    description='CUCEI Reporter',
    url='https://github.com/andaviaco/cucei-reporter',
    author=u'Andrés Ávila',
    author_email='andaviaco@gmail.com',
    license='MIT',
    packages=[''],
    install_requires=[
        'Flask==0.12',
        'Flask-SQLAlchemy==2.2',
        'sqlalchemy==1.1.9',
        'Flask-Login==0.4.0',
        'unicodecsv',
    ],
    zip_safe=False
    )
