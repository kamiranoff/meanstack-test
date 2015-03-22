var mongoose = require('mongoose'),
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  User = mongoose.model('User');

module.exports = function() {


  passport.use(new LocalStrategy({
      usernameField: 'userName',
      passwordField: 'password'
    },
    function(userName, password, done) {
      console.log("Authenticating user: ", userName, password);
      User.findOne({
        userName: userName
      }).exec(function(err, user) {
        if (err) {
          return done(err);
        }
        if (user && user.authenticate(password)) {
          return done(null, user);
        } else {
          return done(null, false, {
            message: 'Incorrect username.'
          });
        }
      });

    }));



  //SERIALIZE
  passport.serializeUser(function(user, done) {
    console.log('Serializing: ', user);
    if (user) {
      done(null, user._id);
    }
  });

  //DESERIALIZE
  passport.deserializeUser(function(id, done) {
    User.findOne({
      _id: id
    }, function(err, user) {
      console.log('Deserializing: ', id);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }

    });
  });
};

