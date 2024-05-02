from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from io import StringIO
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)
# Configure CORS for all domains or be specific with origins parameter
CORS(app, resources={r"/*": {"origins": "*"}})
dataString, itemString, globalFileName = '','',''

class SalesPredictor:
    def __init__(self, filename, date_column, sales_column):
        self.filename = filename
        self.date_column = date_column
        self.sales_column = sales_column

    def preprocess_data(self, sales_data):
        sales_data[self.date_column] = pd.to_datetime(sales_data[self.date_column])
        sales_data[self.date_column] = sales_data[self.date_column].dt.to_period('M')

        monthly_sales = sales_data.groupby(self.date_column).sum().reset_index()
        monthly_sales[self.date_column] = monthly_sales[self.date_column].dt.to_timestamp()
        monthly_sales['sales_diff'] = monthly_sales[self.sales_column].diff()
        monthly_sales = monthly_sales.dropna()

        return monthly_sales

    def create_supervised_dataset(self, monthly_sales_data, lag=12):
        supervised_data = monthly_sales_data.drop([self.date_column, self.sales_column], axis=1)

        for i in range(1, lag + 1):
            col_name = 'month_' + str(i)
            supervised_data[col_name] = supervised_data['sales_diff'].shift(i)
        supervised_data = supervised_data.dropna().reset_index(drop=True)

        return supervised_data

    def train_model(self, train_data, scaler):
        scaler.fit(train_data)
        scaled_train_data = scaler.transform(train_data)
        X_train, y_train = scaled_train_data[:, 1:], scaled_train_data[:, 0:1]
        y_train = y_train.ravel()

        linreg_model = LinearRegression()
        linreg_model.fit(X_train, y_train)

        return linreg_model

    def predict_sales(self, model, test_data, scaler, actual_sales):
        scaled_test_data = scaler.transform(test_data)
        X_test, y_test = scaled_test_data[:, 1:], scaled_test_data[:, 0:1]
        y_test = y_test.ravel()

        linreg_pred = model.predict(X_test)

        linreg_pred_test_set = np.concatenate([linreg_pred.reshape(-1, 1), X_test], axis=1)
        linreg_pred_test_set = scaler.inverse_transform(linreg_pred_test_set)

        result_list = [linreg_pred_test_set[index][0] + actual_sales[index] for index in
                       range(len(linreg_pred_test_set))]
        return result_list

    def evaluate_model(self, predictions, actual):
        rmse = np.sqrt(mean_squared_error(predictions, actual))
        mae = mean_absolute_error(predictions, actual)
        r2 = r2_score(predictions, actual)
        return rmse, mae, r2

    def run(self):
        import pandas as pd
        from sklearn.preprocessing import MinMaxScaler

        # Load and prepare data
        sales = pd.read_csv(self.filename)
        sales = sales[[self.date_column, self.sales_column]]

        monthly_sales = self.preprocess_data(sales)
        supervised_data = self.create_supervised_dataset(monthly_sales)

        # Train-test split
        train_data = supervised_data[:-12]
        test_data = supervised_data[-12:]

        # Model training
        scaler = MinMaxScaler(feature_range=(-1, 1))
        linreg_model = self.train_model(train_data, scaler)

        # Prediction
        sales_dates = monthly_sales[self.date_column][-12:].tolist()
        act_sales = monthly_sales[self.sales_column][-13:].tolist()  # Adjusted based on your setup

        predictions = self.predict_sales(linreg_model, test_data, scaler, act_sales)

        # Evaluation (optional, depending on your needs)
        linreg_rmse, linreg_mae, linreg_r2 = self.evaluate_model(predictions, monthly_sales[self.sales_column][-12:])
        print('Linear Regression RMSE:', linreg_rmse)
        print('Linear Regression MAE:', linreg_mae)
        print('Linear Regression R2 Score:', linreg_r2)

        # Prepare data for sending to React
        result = {
            "dates": sales_dates,
            "predictions": predictions
        }
        return result


def allowed_file(filename):
    ALLOWED_EXTENSIONS = {'csv'}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/upload', methods=['POST'])
def upload_file():
    global globalFileName

    # Check if the file part is present in the request
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400

    file = request.files['file']

    # If the user does not select a file, the browser submits an
    # empty part without a filename
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        globalFileName = filename

        # Path to save the file, which is the current directory of the script
        save_path = os.path.join(os.getcwd(), filename)
        file.save(save_path)

        # Read only column names without loading entire data
        try:
            with open(save_path, 'r') as f:
                columns = pd.read_csv(f, nrows=0).columns.tolist()
        except Exception as e:
            return jsonify({'error': 'Failed to read file columns', 'details': str(e)}), 500

        return jsonify({'message': 'File uploaded successfully', 'columns': columns})
    else:
        return jsonify({'error': 'Invalid file or file type'}), 400


@app.route('/predict', methods=['POST'])
def predict():
    data = request.json

    predictor = SalesPredictor(globalFileName, data['selectedColumns'][0], data['selectedColumns'][1])
    temp = predictor.run()

    return jsonify(temp)


if __name__ == "__main__":
    app.run(debug=True)