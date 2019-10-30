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
        local_words = ['{}'.format(make)]
        while local_words:
            word = local_words.pop()
            if word not in words:
                words[word] = {}
        if make not in words:
            words[make] = {}
    return words

words = get_words(sys.argv[1])
autocomplete = AutoComplete(words=words)
currentString=""
currentString = sys.argv[2]
if " " in currentString:
    print("End of Word")
else:
    results = autocomplete.search(word=currentString)
    print(results)
    