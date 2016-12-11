'use strict';

var express     = require('express'),
    morgan      = require('morgan'),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    port        = (process.env.PORT || 5000);

var app = express();
mongoose.connect('mongodb://localhost/first_ecommerce', function(err){
  if (err) throw err;
  console.log('Successfully connected to database.');
});

app.use(morgan('dev'));

app.get('/', function(req, res){
  res.send('Woohoo!');
});

app.listen(port, function (err) {
  if (err) throw err;
  console.log('Ecommerce running on 5000...');
});