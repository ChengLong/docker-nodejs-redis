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
    const servedBy = 'This request is served by ' + os.hostname();
    const pageVisits = 'You have viewed this page ' + visits + ' times!';
    const serverTime = 'Server Time: ' + new Date().toISOString();
    const message = 'Have a nice day!';
    const response = [servedBy, pageVisits, serverTime, message].join('\n');
    res.send(response);
  });
});

const appPort = 8080;
http.createServer(app).listen(appPort, function() {
  console.log('Listening on port ' + appPort);
});
