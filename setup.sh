#!/bin/bash

npm install --prefix app
npm install --prefix graph

npm run build --prefix app
npm run build --prefix graph
