#!/usr/bin/env python

# apiserver.py		API server for the PiSpy camera
# version		0.0.1
# author		Brian Walter @briantwalter
# description		RESTful API for controlling and 
#			reading data for the PiSpy Camera

# imports
import re
from flask import Flask, jsonify, request

# create flask application object
app = Flask(__name__)

# non-routable functions
def json_error():
  return jsonify(error='generic', descrption='none')

# routes for API calls
@app.route('/api/temp', methods=['GET', 'POST'])
def json_temp():
  location = open('/etc/location', "r")
  city = location.readline()
  location.close()
  print "DEBUG: city is", city.rstrip("\n")
  if city.rstrip("\n") == 'boise':
    thermfile = "/sys/bus/w1/devices/28-000005ff95db/w1_slave" # Boise thermometer
  if city.rstrip("\n") == 'seattle':
    thermfile = "/sys/bus/w1/devices/28-000005fd70d4/w1_slave" # Seattle thermometer
  print "DEBUG: thermfile is: ", thermfile
  if request.method == 'GET':
    infile = open(thermfile, "r")
    templine = infile.readlines()[1:]
    infile.close()
    print "DEBUG: raw file line: ", templine
    match = re.search('t=...', str(templine))
    if match:
      longc = re.sub(r't=', '', match.group())
      decc = float(longc) / 10;
      decf = ((decc * 9) / 5) + 32
      currenttemp = [ { 'celsius': float(decc), 'fahrenheit': int(decf) } ]
      return jsonify({'currenttemp': currenttemp})
    else:
      return json_error()

# main
if __name__ == '__main__':
  #app.debug = True
  app.port = 5000
  app.run()