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
    if (request.method == "POST"):
        # bytesOfImage = request.get_data()
        # file = './image/image.jpg'
        # # file = './image/example.jpg'
        # with open(file, 'wb') as out:
        #     out.write(bytesOfImage)
        # print("Image received", file)
        # res = getJSONReceit(file)

        # if 'photo' not in request.files:
        # return jsonify({'error': 'No photo provided'}), 400

        photo = request.files['photo']

        if photo.filename == '':
            return jsonify({'error': 'No selected file'}), 400

        # Save the photo to a specific folder (replace 'uploads' with your folder name)
        path = 'C:/Users/Daniel/Desktop/smarthack/SMARThack/backend/image/' + photo.filename

        print("Image received", path)
        photo.save(path)
        res = getJSONReceit(path)

        return jsonify(res), 200
