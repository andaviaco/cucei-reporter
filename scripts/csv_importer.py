import sys
import unicodecsv as csv

# run from root directory
from reporter import db
from models import User

if sys.argv[1]:
    db.create_all()

    with open(sys.argv[1], 'rb') as f:
        reader = csv.reader(f, encoding='utf-8')
        users = {row[0]: row for row in reader}

        for userdata in users.itervalues():
            user = User(*userdata)
            db.session.add(user)

    db.session.commit()
