import csv
from fast_autocomplete.misc import read_csv_gen
from fast_autocomplete import AutoComplete


def get_words(path):
    csv_gen = read_csv_gen(path, csv_func=csv.DictReader)
    words = {}
    for line in csv_gen:
        make = line['make']
        local_words = ['{}'.format(make)]
        while local_words:
            word = local_words.pop()
            if word not in words:
                words[word] = {}
        if make not in words:
            words[make] = {}
    return words

words = get_words("mostusedwords.csv")
autocomplete = AutoComplete(words=words)
inp = str(input("Input: "))
results = autocomplete.search(word=inp)
print(results)