#!/bin/bash
cd /home/ubuntu
sudo rm package-lock.json -y
sudo rm -r  node_modules/ -y
npm install
npm start
