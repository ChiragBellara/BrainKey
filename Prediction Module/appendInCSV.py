import sys
import pandas as pd

a = sys.argv[1]
data = pd.read_csv(r"E:\Brain-Keyboard\Prediction Module\Wordlists\usersList.csv", dtype=str,)

l = data["wordList"].to_list()
if a not in l:
    df = pd.DataFrame({"wordList":[a]})
    df.to_csv(r"E:\Brain-Keyboard\Prediction Module\Wordlists\usersList.csv", mode='a', header=False, index=False)