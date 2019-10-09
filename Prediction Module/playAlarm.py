from playsound import playsound
try:
    while True:
        playsound('alarm.mp3')
except KeyboardInterrupt:
    print("Exiting")
