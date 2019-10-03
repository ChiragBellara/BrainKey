# import json
# from pprint import pprint

# with open("outputLog.txt") as out:
#     #print(type(out))
#     data = out.read()
#     jsonData = json.dumps(data, indent=4)
#     pprint(jsonData)


import json
with open('data.json', 'w', encoding='utf-8') as f:
    with open("outputLog.txt") as out:
    #print(type(out))
        data = out.readlines()
        #print(data)
        print(type(data))
        for line in data:
            inpData = line.split(',')
            print(inpData,type(inpData
            ))
        json.dump(data,f, ensure_ascii=False, indent=4*' ')

# with open("outputLog.txt") as out:
#     #print(type(out))
#     data = out.readlines()
#     with open('dict.csv', 'w') as csv_file:
#         writer = csv.writer(csv_file)
#         for key, value in mydict.items():
#             writer.writerow([key, value])