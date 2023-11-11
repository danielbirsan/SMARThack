from flask import Flask, Response, request, jsonify
from io import BytesIO
import base64
from flask_cors import CORS, cross_origin
import os
import sys
from extract_data import getJSONReceit

app = Flask(__name__)
cors = CORS(app)


@app.route("/image", methods=['GET', 'POST'])
def image():
    if(request.method == "POST"):
        bytesOfImage = request.get_data()
        file = './input/image.jpeg'
        # file = './image/example.jpg'
        with open(file, 'wb') as out:
            out.write(bytesOfImage)
        res = getJSONReceit(file)
        return res
