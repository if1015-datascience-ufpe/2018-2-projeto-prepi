FROM node:8.12.0-alpine

RUN mkdir api

WORKDIR api

COPY package*.json ./

RUN npm install
RUN npm install supervisor -g

COPY . .
