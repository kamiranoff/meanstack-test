var mongoose = require('mongoose'),
    userModel = require('../models/User'),
    courseModel = require('../models/Course'),
    kevinModel = require('../models/Kevin');

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
  userModel.createDefaultUsers();
  courseModel.createDefaultCourses();
  kevinModel.createDefaultKevin();

};


