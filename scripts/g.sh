#!/bin/bash

# navigate to app folder
cd /home/ubuntu

# install node and npm
curl -sL https://rpm.nodesource.com/setup_16.x | sudo -E bash -
sudo apt install nodejs npm -y
