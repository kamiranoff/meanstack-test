var Kevin = require('mongoose').model('Kevin');


exports.getKevinInfo = function(req,res){
  Kevin.find({}).exec(function(err,collection){
    res.send(collection);
  });
};