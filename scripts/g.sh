#!/bin/bash

# navigate to app folder
cd /home/ubuntu

# install node and npm
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash - &&\
sudo apt-get install -y nodejs
