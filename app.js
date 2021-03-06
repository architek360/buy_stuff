'use strict';

var express       = require('express'),
    morgan        = require('morgan'),
    bodyParser    = require('body-parser'),
    mongoose      = require('mongoose'),
    pug           = require('pug'),
    session       = require('express-session'),
    cookieParser  = require('cookie-parser'),
    flash         = require('express-flash'),
    mongoStore    = require('connect-mongo/es5')(session),
    passport      = require('passport');

var config = require('./config/config');
var User = require('./models/user');
var Category = require('./models/category');
var Product = require('./models/product');

var app = express();
mongoose.connect(config.database, function(err){
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
  secret: config.secretKey,
  store: new mongoStore({ url: config.database, autoReconnect: true })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next){
  res.locals.user = req.user;
  next();
})
app.use(flash());
app.set('view engine', 'pug');

app.use(function(req, res, next){
  Category.find({}, function(err, categories){
    if (err) return next(err);
    res.locals.categories = categories;
    next();
  });
});

var mainRoutes = require('./routes/main');
var userRoutes = require('./routes/user');
var adminRoutes = require('./routes/admin');
var apiRoutes = require('./api/api');
app.use(mainRoutes);
app.use(userRoutes);
app.use(adminRoutes);
app.use('/api', apiRoutes);

app.listen(config.port, function (err) {
  if (err) throw err;
  console.log('Ecommerce running on 5000...');
});