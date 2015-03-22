var passport = require('passport'),
  bodyParser = require('body-parser');

exports.authenticate = function(req, res, next) {
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
