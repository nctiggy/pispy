#!/bin/bash

# refresh.cgi		Refresh the Pi Camera image
# version		0.0.3
# author		Brian Walter @briantwalter
# description		Simple CGI to run on Lighttpd that
#			produces and image and redirect

# configuration
INDEX="/image.html"
STATUS="Status: 302 Moved"
LOCATION="Location: ${INDEX}"
OUTFILE="capture.jpg"
STILLCMD="raspistill -n -q 10 -w 720 -h 480 -t 1 -o"
#THERMFILE="/sys/bus/w1/devices/28-000005ff95db/w1_slave" # Boise thermometer
THERMFILE="/sys/bus/w1/devices/28-000005fd70d4/w1_slave" # Seattle thermometer

# functions 
# return current temperature in C and F
function gettemperature() {
  if [ -f ${THERMFILE} ]; then
    WORKING=`head -1 ${THERMFILE} | awk '{print $12}'`
    if [ "${WORKING}" == "YES" ]; then
      LONGC=`tail -1 ${THERMFILE} | awk '{print $10}' | sed -e 's/t=//'`
      SHORTC=`echo ${LONGC:0:2}`
      SHORTF=`expr \( ${SHORTC} \* 9 \) / 5 + 32`
    fi
  fi
}
# detect image size and overly temperatures
function thermonimage() {
  if [ -f ${OUTFILE} ]; then
    gettemperature
    convert\
      "${OUTFILE}"\
      -fill "white"\
      -undercolor "#0008"\
      -pointsize "12"\
      -gravity "southeast"\
      -annotate +10+10 "Current temperature is ${SHORTC} C / ${SHORTF} F"\
      "${OUTFILE}"
    DATE=`date`
    convert\
      "${OUTFILE}"\
      -fill "white"\
      -undercolor "#0008"\
      -pointsize "12"\
      -gravity "southwest"\
      -annotate +10+10 "${DATE}"\
      "${OUTFILE}"
  fi  
}
# rollup all functions here
function runner() {
  ${STILLCMD} ${OUTFILE}
  thermonimage
}

# main
if [ -w ${OUTFILE} ]; then
  runner
fi

# always print the redirect
printf "${STATUS}\n${LOCATION}\n\n"
