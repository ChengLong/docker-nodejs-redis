'use strict';

const express = require('express'),
      http = require('http'),
      redis = require('redis'),
      os = require('os');

const client = redis.createClient(6379, 'redis');
const app = express();

app.get('/', function(req, res, next) {
  client.incr('visits', function(err, visits) {
    if(err) return next(err);
    res.send('This request is served by ' + os.hostname() + '. You have viewed this page ' + visits + ' times!');
  });
});

const appPort = 8080;
http.createServer(app).listen(appPort, function() {
  console.log('Listening on port ' + appPort);
});
