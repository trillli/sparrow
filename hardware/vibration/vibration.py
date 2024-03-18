# Original code from: https://peppe8o.com/vibration-module-raspberry-pi/
#TODO: Modify to vibrate on/off in a loop for the scheduled duration from a user's alarm config

import RPi.GPIO as GPIO
import time

def vibrate():
    GPIO.output(vibration_pin, GPIO.HIGH)
    time.sleep(0.5)
    GPIO.output(vibration_pin, GPIO.LOW)

vibration_pin = 27
GPIO.setmode(GPIO.BCM)
GPIO.setup(vibration_pin, GPIO.out)

vibrate()

GPIO.cleanup()


