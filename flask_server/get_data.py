import csv
import pandas as pd
import os

def get_data_loh(input_data):
    csv_file_path = "/Users/kornievski/Desktop/mood/flask_server/dbs/data.csv"
    df = pd.read_csv(csv_file_path)

    if input_data == '':
        arr = df['URI'].tolist()  # Retrieve all existing data
    else:
        if input_data in df['URI'].values:
            # Remove the input_data from the DataFrame
            df = df[df['URI'] != input_data]
            df.to_csv(csv_file_path, index=False)  # Update the CSV file
        else:
            with open(csv_file_path, 'a', newline='') as file:
                writer = csv.writer(file)
                writer.writerow([input_data])

        df = pd.read_csv(csv_file_path)  # Read the updated CSV file
        arr = df['URI'].tolist()  # Retrieve all updated data

    return arr
