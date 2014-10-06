#!/bin/bash

sudo apt-get -y remove lightttpd
sudo apt-get -y autoremove
sudo apt-get -y install nginx
sudo htpasswd -c /etc/nginx/htpasswd legnats
sudo rm -rf /etc/lighttpd
sudo rm -r /etc/nginx/sites-enabled/default
sudo cp pispy.nginx /etc/nginx/sites-available/pispy
sudo ln -s /etc/nginx/sites-available/pispy /etc/nginx/sites-enabled
sudo update-rc.d nginx defaults
sudo service nginx restart

