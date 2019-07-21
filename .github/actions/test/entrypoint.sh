#!/bin/sh -l

mongod &
npm i
export MONGODB_URI=mongodb://127.0.0.1:27017/test 
node server.js &
sleep 2
npm test
