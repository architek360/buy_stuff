'use strict';

var express = require('express'),
    morgan  = require('morgan'),
    port    = (process.env.PORT || 5000);

var app = express();

app.use(morgan('dev'));

app.get('/', function(req, res){
  res.send('Woohoo!');
});

app.listen(port, function (err) {
  if (err) throw err;
  console.log('Ecommerce running on 5000...');
});