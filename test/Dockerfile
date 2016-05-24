FROM node:5.10-slim
MAINTAINER Cheng Long <me@chengl.com>

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y netcat

COPY package.json .
RUN npm install
RUN npm install -g mocha

COPY . .

CMD ./test.sh
