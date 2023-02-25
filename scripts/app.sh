#!/bin/bash
cd /home/ubuntu
sudo rm package-lock.json
sudo rm -r  node_modules/
npm install
npm start
