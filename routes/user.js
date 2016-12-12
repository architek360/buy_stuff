var router = require('express').Router();
var User = require('../models/user');

router.get('/signup', function(req, res){
  res.render('accounts/signup', {
    errors: req.flash('errors')
  });
});

router.post('/signup', function(req, res, next) {
  var user = new User();

  user.profile.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;

  User.findOne({email: req.body.email}, function (err, existingUser) {
    if (existingUser) {
      req.flash('errors', 'Account with e-mail "' + req.body.email + '" already exists');
      res.redirect('/signup');
    } else {
      user.save(function (err, user) {
        if (err) return next(err);
        res.redirect('/');
      });
    }
  });
});

module.exports = router;