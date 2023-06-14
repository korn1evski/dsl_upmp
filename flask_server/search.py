import pandas as pd
import re
import os
import sys
import json
import numpy as np
from sklearn import tree
from sklearn import preprocessing
import nltk
# !{sys.executable} -m pip install txtai
from txtai.embeddings import Embeddings
from collections import defaultdict
from nltk.tokenize import word_tokenize
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# import smart_search
def search(inp):
    df = pd.read_csv(r"/Users/kornievski/Desktop/mood/flask_server/dbs/out.csv")


    inp = inp.lower()
    inp = re.sub("[.,?!&@#`]"," ", inp)
    inp = re.sub(r'\[\[(?:[^|\]]*\|)?([^\]]*)]]', " ", inp)
    inp = re.sub("['’]","",inp)
    inp = re.sub("[-]","",inp)

    inp_tok = word_tokenize(inp)
    dct = defaultdict(int)

    for index, row in df.drop(columns=['index','Popularity']).iterrows():
        x = str(row['Title'])
        x = x.lower()
        x = re.sub("[().,?!&@#`]","", x)
        x = re.sub("['’]","",x)
        x = re.sub("[-]","",x)
        x = word_tokenize(x)
        if len(list(set(inp_tok))) == len(inp_tok):
            x = list(set(x))
        y = str(row['Artist'])
        y = y.lower()
        y = re.sub("[().,?!&@#`]","", y)
        y = re.sub("['’]","",y)
        y = re.sub("[-]","",y)
        y = word_tokenize(y)
        z = str(row['Album'])
        z = z.lower()
        z = re.sub("[().,?!&@#`]","", z)
        z = re.sub("['’]","",z)
        z = re.sub("[-]","",z)
        z = word_tokenize(z)
        x = x + y + z


        if (dct[f"{row['URI']}"] == 0):
            for element in x:
                    for element_1 in inp_tok:
                        if(element==element_1):
                            dct[f"{row['URI']}"]+=1

    i = 0
    u = dict(sorted(dct.items(), key=lambda item: item[1],reverse=True))
    array = []
    for element in u:
            array.append(element)
            i+=1
            if i==10:
                break
    return array