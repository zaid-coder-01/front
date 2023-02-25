#!/bin/bash
cd /home/ubuntu
sudo rm package-lock.json -yes
sudo rm -r  node_modules/
npm install
npm start
