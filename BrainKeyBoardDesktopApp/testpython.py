import sys
import time 
import random
a =  sys.argv[0]
print(a)
while(1):
    print("hello from python")
    time.sleep(random.choice([1,2,3, 4,5,6,7, 8,9,10]))
    sys.stdout.flush()