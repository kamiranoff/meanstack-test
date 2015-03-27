var mongoose = require('mongoose');

var kevinSchema = mongoose.Schema({
  firstName:String,
  lastName:String,
  phoneNumber:String,
  email:String,
  quote:String
});
var Kevin = mongoose.model('Kevin',kevinSchema);

function createDefaultKevin(){
  Kevin.find({}).exec(function(err, collection) {
    if(collection.length === 0) {
      Kevin.create({
        firstName: 'kevin',
        lastName: 'Amiranoff',
        email: 'kamiranoff@gmail.com',
        phoneNumber:'0660530196',
        quite:'When things go wrong, don\'t gow with them'
      });
    }
  });
}

exports.createDefaultKevin = createDefaultKevin;