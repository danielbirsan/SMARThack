from flask import Flask, Response, request, jsonify
from io import BytesIO
import base64
from flask_cors import CORS, cross_origin
import os
import sys
import json
from extract_data import getJSONReceit
from openai import OpenAI
import json

app = Flask(__name__)
cors = CORS(app)

client = OpenAI(
    api_key='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'
)


@app.route("/image", methods=['GET', 'POST'])
def image():
    if (request.method == "POST"):
        photo = request.files['photo']

        if photo.filename == '':
            return jsonify({'error': 'No selected file'}), 400

        # Save the photo to a specific folder (replace 'uploads' with your folder name)
        path = 'C:/Users/Daniel/Desktop/smarthack/SMARThack/backend/image/' + photo.filename

        print("Image received", path)
        photo.save(path)
        res = getJSONReceit(path)

        print(res)

        print({
            "role": "user",
            "content": "Transform the following JSON:\n" + str(res["receit"]) +
            "\ninto a new json with the fields: “product_name_trimed” which excludes the quantity, “category” like vegetables, fruits, meat, alcohol, snacks and others, “health_id”, which ranges from 1 (bad for health) to 5 (good), “price”"
        })

        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{
                "role": "user",
                "content": "Transform the following JSON:\n" + str(res["receit"]) +
                "\ninto a new json with the fields: “product_name_trimed” which excludes the quantity, “category” like vegetables, fruits, meat, alcohol, snacks and others, “health_id”, which ranges from 1 (bad for health) to 5 (good), “price”"
            }]
        )

        # response = openai.ChatCompletion.create(
        #     engine="text-davinci-003",  # Specify the engine you want to use
        #     prompt="Transform the following JSON:\n" +
        #     str(res["receipt"]) +
        #     "\ninto a new json with the fields: “product_name_trimed” which excludes the quantity, “category” like vegetables, fruits, meat, alcohol, snacks and others, “health_id”, which ranges from 1 (bad for health) to 5 (good), “price”",
        #     max_tokens=50  # Adjust as needed
        # )

        print(json.dumps(response), indent=3)

        return jsonify(res), 200
