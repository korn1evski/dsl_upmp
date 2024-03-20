import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error
from sklearn.linear_model import BayesianRidge
from sklearn.linear_model import SGDRegressor
from sklearn.linear_model import ElasticNet
import numpy as np

# THIS SINGLE ROW IS EXTREMELY IMPORTANT AS IT REMOVES THE ROWS WHERE THERE IS NAN INFO WHICH WOULD HAVE
# SIGNIFICANTLY INFLUENCED OUR RESULTS IF WASN'T DONE.
teams = teams.dropna()

# TRAINING THE MODEL ON PAST YEARS IN ORDER FOR IT TO TEST THE RESULTS BASED ON FUTURE YEARS
train = teams[teams["year"] < 2012].copy()
test = teams[teams["year"] >= 2012].copy()


reg = ElasticNet()

predictors = ["athletes", "prev_medals"]
target = "medals"

reg.fit(train[predictors], train["medals"])

predictions = reg.predict(test[predictors])

test["predictions"] = predictions

test.loc[test["predictions"] < 0, "predictions"] = 0

test["predictions"] = test["predictions"].round()

error = mean_absolute_error(test["medals"], test["predictions"])

print(error)

errors = (test["medals"] - test["predictions"]).abs()
print(errors)

error_by_team = errors.groupby(test["team"]).mean()
print(error_by_team)

medals_by_team = test["medals"].groupby(test["team"]).mean()
error_ratio = error_by_team / medals_by_team
error_ratio = error_ratio[~pd.isnull(error_ratio)]
error_ratio = error_ratio[np.isfinite(error_ratio)]
error_ratio.sort_values()
print(error_ratio)




