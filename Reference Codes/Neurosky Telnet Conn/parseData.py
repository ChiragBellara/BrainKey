import json
from pprint import pprint

with open("outputLog.txt") as out:
    #print(type(out))
    data = out.read()
    jsonData = json.dumps(data, indent=4)
    pprint(jsonData)
    #print(type(data))
    #data = json.loads(out)
    #print(type(lines))
#print(str(data))
'''
b'{
    "eSense":{
        "attention":0,"meditation":0
        },
    "eegPower":{
        "delta":15330,"theta":17805,"lowAlpha":11337,"highAlpha":4899,"lowBeta":2958,"highBeta":1048,"lowGamma":2169,"highGamma":2286
        },
    "poorSignalLevel":25}
\r'
'''