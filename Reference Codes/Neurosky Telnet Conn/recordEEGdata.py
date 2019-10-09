import json
import socket
import hashlib
import logging
from telnetlib import Telnet
import time
import sys

LOGFILE = 'logfile.log'
logging.basicConfig(filename=LOGFILE, format='%(asctime)s %(levelname)s %(message)s', level=logging.DEBUG)

EEG_FILE = 'eegDataDIYA.csv'
BLINK_FILE = 'blinkDataDIYA.csv'
TGHOST = "localhost"
TGPORT = 13854
CONFSTRING = '{"enableRawOutput": false, "format": "Json"}'

EEG_POWER = [
    u'poorSignalLevel',
    u'delta',
    u'theta',
    u'lowAlpha',
    u'highAlpha',
    u'lowBeta',
    u'highBeta',
    u'lowGamma',
    u'highGamma',
]

E_SENSE = [
    u'attention',
    u'meditation',

]

BLINK_STRENGTH = [
    u'blinkStrength',
]

class ThinkGearConnection():
    def __init__(self):
        self.data_object = {}
        self.data_to_write = []

    def connect(self, host, port):
        logging.info("Connecting to TGC socket...")
        #self.sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        #self.sock.connect((host, int(port)))
        self.sock = Telnet('localhost',13854)
        return self.sock

    def disconnect(self):
        pass

    # def authenticate(self, app_name, app_key):
    #     logging.info("Authenticating...")
    #     self.app_name = app_name
    #     self.app_key = hashlib.sha1(self.app_key).hexdigest()
    #     self.auth_request = json.dumps({"appName": self.app_name, "appKey": self.app_key}, sort_keys=False)
    #     logging.info("Authenticate string: " + self.auth_request)
    #     #self.auth_request = '{"appName": "Brainwave Shooters", "appKey": "9f54141b4b4c567c558d3a76cb8d715cbde03096"}'
    #     self.sock.send(str(self.auth_request))
    #     self.auth_response = self.sock.recv(1024)
    #     return self.auth_response

    # def configure(self):
    #     logging.info("Configuring TGC to use JSON...")
    #     self.sock.send(CONFSTRING)
    #     pass


    def record_data(self):
        self.sock.write('{"enableRawOutput": false, "format": "Json"}'.encode('ascii'))
        logging.info("Recording brain data...")
        f = open(EEG_FILE,"a")
        f2 = open(BLINK_FILE,'a')
        f.write(','.join(EEG_POWER)+ ',' + ','.join(E_SENSE) + '\n')
        f2.write(','.join(BLINK_STRENGTH) + '\n')
        while (1):
            try:
                self.data = self.sock.read_until(b'\r')
                self.data = self.data.decode('ascii')
                self.json_data = json.loads(str(self.data))
                #print(self.json_data)
                if 'eegPower' in self.json_data:
                    print("Connected")
                    sys.stdout.flush()
                    for i in EEG_POWER:
                        if i in self.json_data[u'eegPower']:
                            self.data_to_write.append(str(self.json_data[u'eegPower'][i]))
                        else:
                            self.data_to_write.append('')
                    for i in E_SENSE:
                        if i in self.json_data[u'eSense']:
                            self.data_to_write.append(str(self.json_data[u'eSense'][i]))
                    f.write(','.join(self.data_to_write)+'\n')
                    #print(','.join(self.data_to_write))
                    self.data_to_write = []
                elif 'blinkStrength' in self.json_data:
                    for i in BLINK_STRENGTH:
                        #print(type(self.json_data[u'blinkStrength']))
                        self.data_to_write.append(str(self.json_data[u'blinkStrength']))
                        
                    f2.write(','.join(self.data_to_write)+'\n')
                    print(self.data_to_write)
                    sys.stdout.flush()
                    #print(','.join(self.data_to_write))
                    self.data_to_write = []
            except KeyboardInterrupt:
                print("Quitting..")
                #f.close()
                break


if __name__ == "__main__":
    conn = ThinkGearConnection()
    try:
        conn.connect(TGHOST, TGPORT)
        logging.info("Connected.")
        
        conn.record_data()
    except Exception:
        logging.exception("Exception:")
        logging.error("No connection with TGC socket")
