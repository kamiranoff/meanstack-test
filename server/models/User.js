var mongoose = require('mongoose'),
    encrypt = require('../utilities/encryption');

var userSchema = mongoose.Schema({
  email: {
    type:String,
    required:'{PATH} is required',
    unique:true
  },
  userName: {
    type:String,
    required:'{PATH} is required',
    unique:true
  },
  firstName: {type:String,required:'{PATH} is required'},
  lastName: {type:String,required:'{PATH} is required'},
  salt: {type:String,required:'{PATH} is required'},
  hashed_pwd: {type:String,required:'{PATH} is required'},
  roles: [String]
});


userSchema.methods = {
  authenticate: function(passwordToMatch) {
    return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
  },
  hasRole:function(role){
    return this.roles.indexOf(role) > -1;
  }
};

var User = mongoose.model('User', userSchema);

function createDefaultUsers(){
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
        email: 'kamiranoff@gmail.com',
        salt: salt,
        hashed_pwd: hash,
        roles: ['admin']
      });
      salt = encrypt.createSalt();
      hash = encrypt.hashPwd(salt, 'Jenifer75@');
      User.create({
        firstName: 'Betsy',
        lastName: 'Braddock',
        userName: 'psylocke',
        email: 'betsy@xmen.com',
        salt: salt,
        hashed_pwd: hash,
        roles: []
      });
      salt = encrypt.createSalt();
      hash = encrypt.hashPwd(salt, 'Jenifer75@');
      User.create({
        firstName: 'Kitty',
        lastName: 'Pryde',
        userName: 'shadowcat',
        email: 'kitty@xmen.com',
        salt: salt,
        hashed_pwd: hash
      });

    }
  });
}
exports.createDefaultUsers = createDefaultUsers;