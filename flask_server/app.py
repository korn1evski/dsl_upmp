# from selenium import webdriver
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
from search import search

app = Flask(__name__)
CORS(app)



@app.route('/api',methods=['POST','GET'])
def home():
    content_type = request.headers.get('Content-Type')
    if (content_type == 'application/json'):
        input_data = request.json.get('input')
        output = search(input_data)
        response = jsonify({'output': output})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    else:
        return "fucking error bitch"




if __name__ == '__main__':
    app.run(debug=True)