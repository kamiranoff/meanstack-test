var User = require('mongoose').model('User'),
    encrypt = require('../utilities/encryption');

exports.getUsers = function(req,res){
  User.find({}).exec(function(err,collection){
    res.send(collection);
  });
};

exports.createUser = function(req,res,next){
  var userData = req.body;
  console.log(userData);

  userData.email = userData.email.toLowerCase();
  //check if user exists
  User.findOne({email : userData.email}, function (err, user) {
    if (err){
      console.log(user);
      console.log('Error in SignUp: '+err);

      return false;
    }
    // already exists
    if (user) {
      err = new Error('You seem to be in our database, apparently.');
      res.status(400);
      res.send({reason:err.toString()});
    }else{
      console.log('still in the loop');
      userData.salt = encrypt.createSalt();
      userData.hashed_pwd = encrypt.hashPwd(userData.salt,userData.password);
      User.create(userData,function(err,user){
        console.log('errors '+err);
        if(err){
          if(err.toString().indexOf('E11000') > -1){
            err = new Error('Duplicate Username');
          }
          res.status(400);
          res.send({reason:err.toString()});
        }
        req.logIn(user,function(err){
          if(err){
            return next(err);
          }
          res.send(user);
        });
      });
    }
  });
};