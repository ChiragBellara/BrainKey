import csv
from fast_autocomplete.misc import read_csv_gen
from fast_autocomplete import AutoComplete
import os


def get_words(path):
    filepath = os.path.join(path,"mostusedwords.csv")
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

words = get_words("Wordlists/")
autocomplete = AutoComplete(words=words)
firstChar = str(input())
results = autocomplete.search(word=firstChar)
print(results)
currentString = firstChar
while True:
    inp = str(input())
    currentString = currentString+inp
    results = autocomplete.search(word=currentString)
    print(results)
    