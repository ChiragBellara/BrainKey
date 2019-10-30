import sys
import json
import time
from telnetlib import Telnet
import numpy as np


tn=Telnet('localhost',13854);

start=time.clock();

i=0;
# app registration step (in this instance unnecessary) 
#tn.write('{"appName": "Example", "appKey": "9f54141b4b4c567c558d3a76cb8d715cbde03096"}');
tn.write('{"enableRawOutput": true, "format": "Json"}'.encode('ascii'));

#blink_or_not = raw_input('Non-zero blink(1) or zero blink(0): ')

outfile="null";
if len(sys.argv)>1:
	outfile=sys.argv[len(sys.argv)-1];
	outfptr=open(outfile,'w');

eSenseDict={'attention':0, 'meditation':0};
waveDict={'lowGamma':0, 'highGamma':0, 'highAlpha':0, 'delta':0, 'highBeta':0, 'lowAlpha':0, 'lowBeta':0, 'theta':0};
signalLevel=0;

values_list = []

iterations = 0
all_values = 0
right_values = 0

# Declarations
time_array = []
blinkStrength_values = []
lowGamma_values = []
highGamma_values = []
highAlpha_values = []
delta_values = []
lowBeta_values = []
highBeta_values = []
theta_values = []
lowAlpha_values = []
attention_values = []
meditation_values = []



while time.clock() - start < 100:
	blinkStrength=0;

	line=tn.read_until(b'\r');
	if len(line) > 20:	
		timediff=time.clock()-start;
		data=line.decode('ascii');
		dict = json.loads(data)
		print(dict)
		if "poorSignalLevel" in dict:
			signalLevel=dict['poorSignalLevel'];
		if "blinkStrength" in dict:
			blinkStrength=dict['blinkStrength'];
		if "eegPower" in dict:
			waveDict=dict['eegPower'];
			eSenseDict=dict['eSense'];
		outputstr=str(timediff)+ ", "+ str(signalLevel)+", "+str(blinkStrength)+", " + str(eSenseDict['attention']) + ", " + str(eSenseDict['meditation']) + ", "+str(waveDict['lowGamma'])+", " + str(waveDict['highGamma'])+", "+ str(waveDict['highAlpha'])+", "+str(waveDict['delta'])+", "+ str(waveDict['highBeta'])+", "+str(waveDict['lowAlpha'])+", "+str(waveDict['lowBeta'])+ ", "+str(waveDict['theta']);
		if blinkStrength==0 and eSenseDict['attention'] ==0 and eSenseDict['meditation'] == 0 and waveDict['lowGamma'] == 0 and waveDict['highGamma']==0 and waveDict['highAlpha']==0 and waveDict['lowAlpha']==0 and waveDict['lowBeta']==0 and waveDict['highBeta']==0 and waveDict['delta']==0 and waveDict['theta']==0:
			continue
		time_array = np.append(time_array, [timediff]);
		blinkStrength_values = np.append(blinkStrength_values, [blinkStrength]);
		lowGamma_values = np.append(lowGamma_values, [waveDict['lowGamma']]);
		highGamma_values = np.append(highGamma_values, [waveDict['highGamma']]);
		highAlpha_values = np.append(highAlpha_values, [waveDict['highAlpha']]);
		delta_values = np.append(delta_values, [waveDict['delta']]);
		lowBeta_values = np.append(lowBeta_values, [waveDict['lowBeta']]);
		highBeta_values = np.append(highBeta_values, [waveDict['highBeta']]);
		theta_values = np.append(theta_values, [waveDict['theta']]);
		lowAlpha_values = np.append(lowAlpha_values, [waveDict['lowAlpha']]);
		attention_values = np.append(attention_values, [eSenseDict['attention']]);
		meditation_values = np.append(meditation_values, [eSenseDict['meditation']]);
		#print(outputstr)
		values_list.append(np.array([blinkStrength, delta_values[-1], highAlpha_values[-1], highBeta_values[-1], highGamma_values[-1], lowAlpha_values[-1], lowBeta_values[-1], lowGamma_values[-1], theta_values[-1]]))
		iterations += 1
		if iterations == 1 or iterations == 2:
		  continue
		else:
			if blinkStrength_values[-2] == 0:    		
				continue
				#print str(timediff) + " ," + str(blinkStrength_values[-2])
			else:
				X_new = []
				for i in range(0, len(values_list[-1])):
					for j in [3,2,1]:
						X_new.append(values_list[-1*j][i])
				X_new = np.array([X_new])
				X_new = sc.transform(X_new)
				value = classifier.predict(X_new)
				all_values += 1
				

print(right_values/all_values)
print(right_values)
print(all_values)
