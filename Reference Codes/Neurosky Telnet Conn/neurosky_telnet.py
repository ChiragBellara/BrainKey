import sys
import json
from telnetlib import Telnet
import csv

tn=Telnet('localhost',13854);

i=0;
# app registration step (in this instance unnecessary) 
#tn.write('{"appName": "Example", "appKey": "9f54141b4b4c567c558d3a76cb8d715cbde03096"}');
tn.write('{"enableRawOutput": true, "format": "Json"}'.encode('utf-8'));


outfile="null";
if len(sys.argv)>1:
	outfile=sys.argv[len(sys.argv)-1];
	outfptr=open(outfile,'w');

eSenseDict={'attention':0, 'meditation':0};
waveDict={'lowGamma':0, 'highGamma':0, 'highAlpha':0, 'delta':0, 'highBeta':0, 'lowAlpha':0, 'lowBeta':0, 'theta':0};
signalLevel=0;

while i<100:
    blinkStrength=0
    line=tn.read_until(b'\r')
    if len(line) > 20:	
        line = line.decode('ascii')
        print(line)
        
tn.close();
outfptr.close();