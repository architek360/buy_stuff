var router = require('express').Router();

router.post('/signup', function(req, res, next){
  var user = new User();

  user.profile.name = req.body.name;
  user.password = req.body.password;
  user.email = req.body.email;

  user.save(function(err){
    if (err) return next(err);
    res.json('Successfully created new user');
  });
});

module.exports = router;