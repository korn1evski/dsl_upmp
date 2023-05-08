# from selenium import webdriver
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
from search import search
from get_data import get_data_loh
import pandas
import csv
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

@app.route('/api/data',methods=['POST','GET'])
def get_data():
    content_type = request.headers.get('Content-Type')
    if content_type == 'application/json':
        input_data = request.json.get('input')
        output = get_data_loh(input_data)
        response = jsonify({'output': output})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    else:
        return "Error: Invalid content type"



if __name__ == '__main__':
    app.run(debug=True)