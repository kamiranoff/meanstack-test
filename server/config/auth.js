var passport = require('passport'),
  bodyParser = require('body-parser');

exports.authenticate = function(req, res, next) {
  console.log(req.body);
  req.body.userName = req.body.userName.toLowerCase();

  console.log("body parsing", req.body);
  var auth = passport.authenticate('local', {
      failureFlash: true
    },
    function(err, user) {
      console.log(user);
      if (err) {
        return next(err);
      }
      if (!user) {
        res.send({
          success: false
        });
      }
      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        }
        res.send({
          success: true,
          user: user
        });
      });
    }
  );
  auth(req, res, next);
};

exports.requireApiLogin = function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.status(403);
    res.end();
  } else {
    next();
  }
};

exports.requireRole = function(role){
  return function(req,res,next){
    if(!req.isAuthenticated() ||  req.user.roles.indexOf(role) === -1){
      res.status(403);
      res.end();
    }else{
      next();
    }
  };
};
