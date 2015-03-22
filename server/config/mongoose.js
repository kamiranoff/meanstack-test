var mongoose = require('mongoose'),
  crypto = require('crypto');

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
    lastName: String,
    userName: String,
    salt: String,
    hashed_pwd: String,
    roles: [String]
  });
  userSchema.methods = {
    authenticate: function(passwordToMatch){
      return hashPwd(this.salt,passwordToMatch) === this.hashed_pwd;
    }
  };
  var User = mongoose.model('User', userSchema);

  User.find({}).exec(function(err, collection) {
    if (collection.length === 0) {
      var salt,
        hash;

      salt = createSalt();
      hash = hashPwd(salt, 'Jenifer75@');

      User.create({
        firstName: 'kevin',
        lastName: 'Amiranoff',
        userName: 'kevin',
        salt: salt,
        hashed_pwd: hash,
        roles:['admin']
      });
      salt = createSalt();
      hash = hashPwd(salt, 'Jenifer75@');
      User.create({
        firstName: 'Betsy',
        lastName: 'Braddock',
        userName: 'psylocke',
        salt: salt,
        hashed_pwd: hash,
        roles:[]
      });
      salt = createSalt();
      hash = hashPwd(salt, 'Jenifer75@');
      User.create({
        firstName: 'Kitty',
        lastName: 'Pryde',
        userName: 'shadowcat',
        salt: salt,
        hashed_pwd: hash
      });

    }
  });
};

function createSalt() {
  return crypto.randomBytes(128).toString('base64');
}

function hashPwd(salt, pwd) {
  var hmac = crypto.createHmac('sha1', salt);
  return hmac.update(pwd).digest('hex');
}
