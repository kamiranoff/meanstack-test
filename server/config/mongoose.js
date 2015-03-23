var mongoose = require('mongoose'),
    encrypt = require('../utilities/encryption');

module.exports = function(config) {

  //   var messageSchema = mongoose.Schema({message:String});
  // var Message = mongoose.model('Message',messageSchema);
  // var mongoMessage;

  mongoose.connect(config.db);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error ...'));
  db.once('open', function callback() {
    console.log(config.msgEnv + ' is opened');

  });

  var userSchema = mongoose.Schema({
    firstName: String,
    email:String,
    lastName: String,
    userName: String,
    salt: String,
    hashed_pwd: String,
    roles: [String]
  });
  userSchema.methods = {
    authenticate: function(passwordToMatch){
      return encrypt.hashPwd(this.salt,passwordToMatch) === this.hashed_pwd;
    }
  };
  var User = mongoose.model('User', userSchema);

  User.find({}).exec(function(err, collection) {
    if (collection.length === 0) {
      var salt,
        hash;

      salt = encrypt.createSalt();
      hash = encrypt.hashPwd(salt, 'Jenifer75@');

      User.create({
        firstName: 'kevin',
        lastName: 'Amiranoff',
        userName: 'kevin',
        email:'kamiranoff@gmail.com',
        salt: salt,
        hashed_pwd: hash,
        roles:['admin']
      });
      salt = encrypt.createSalt();
      hash = encrypt.hashPwd(salt, 'Jenifer75@');
      User.create({
        firstName: 'Betsy',
        lastName: 'Braddock',
        userName: 'psylocke',
        email:'betsy@xmen.com',
        salt: salt,
        hashed_pwd: hash,
        roles:[]
      });
      salt = encrypt.createSalt();
      hash = encrypt.hashPwd(salt, 'Jenifer75@');
      User.create({
        firstName: 'Kitty',
        lastName: 'Pryde',
        userName: 'shadowcat',
        email:'kitty@xmen.com',
        salt: salt,
        hashed_pwd: hash
      });

    }
  });
};


