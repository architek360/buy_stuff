'use strict';

var express       = require('express'),
    morgan        = require('morgan'),
    bodyParser    = require('body-parser'),
    mongoose      = require('mongoose'),
    pug           = require('pug'),
    session       = require('express-session'),
    cookieParser  = require('cookie-parser'),
    flash         = require('express-flash'),
    port          = (process.env.PORT || 5000);

var User = require('./models/user');

var app = express();
mongoose.connect('mongodb://localhost/first_ecommerce', function(err){
  if (err) throw err;
  console.log('Successfully connected to database.');
});

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'mi#$*&!(ke'
}));
app.use(flash());
app.set('view engine', 'pug');

var mainRoutes = require('./routes/main');
var userRoutes = require('./routes/user');
app.use(mainRoutes);
app.use(userRoutes);

app.listen(port, function (err) {
  if (err) throw err;
  console.log('Ecommerce running on 5000...');
});