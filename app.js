'use strict';

var express     = require('express'),
    morgan      = require('morgan'),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    port        = (process.env.PORT || 5000);
var User        = require('./models/user');

var app = express();
mongoose.connect('mongodb://localhost/first_ecommerce', function(err){
  if (err) throw err;
  console.log('Successfully connected to database.');
});

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/create-user', function(req, res, next){
  var user = new User();
  
  user.profile.name = req.body.name;
  user.password = req.body.password;
  user.email = req.body.email;
  
  user.save(function(err){
    if (err) return next(err);
    res.json('Successfully created new user');
  });
});

app.listen(port, function (err) {
  if (err) throw err;
  console.log('Ecommerce running on 5000...');
});