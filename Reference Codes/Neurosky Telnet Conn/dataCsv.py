import json
import csv

outData=open('outputlog.txt','r')
#print(type(outData))


data=outData.read()
x=data.splitlines()
#print(x[5])
for line in x:
    if line[3] != 'p' and line[3] !='b':
        
        d = eval(line.replace("'","'"))
        print(type(d))
        dict=json.loads(d)
        print(dict['eSense'],type(dict))
        csvFile = open('outputlogs.csv','w')
        csvwriter=csv.writer(csvFile)
        csvwriter.writerow(dict.values())
