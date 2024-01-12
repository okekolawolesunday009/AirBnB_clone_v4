#!/usr/bin/python3
"""Starting a flask application"""
from flask import render_template, Flask
import uuid

app = Flask(__name__)


@app.route('/0-hbnb/')
def hbnb():
    """Diplays 0-hbnb.html with cache_id"""
    cache_id = str(uuid.uuid4())
    return render_template("0-hbnb.html", cache_id=cache_id)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
