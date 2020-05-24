import csv
from fast_autocomplete.misc import read_csv_gen
from fast_autocomplete import AutoComplete
import os
import sys


def get_words(filepath):
    csv_gen = read_csv_gen(filepath, csv_func=csv.DictReader)
    words = {}
    for line in csv_gen:
        make = line['wordList']
        local_words = ["{}".format(make)]
        while local_words:
            word = local_words.pop()
            if word not in words:
                words[word] = {}
        if make not in words:
            words[make] = {}
    return words

words = get_words(sys.argv[1])
autocomplete = AutoComplete(words=words)

words2 = get_words(r"E:\Brain-Keyboard\Prediction Module\Wordlists\usersList.csv")
# @ Chirag Change Directory from E to D in your case 

autocomplete2 = AutoComplete(words=words2)

currentString=""
currentString = sys.argv[2]
if " " in currentString:
    print("End of Word")
else:
    results = autocomplete.search(word=currentString)
    combined = autocomplete2.search(word=currentString)
    combined.extend(results)
    flat_list = [item for sublist in combined for item in sublist][:8]
    print(flat_list)