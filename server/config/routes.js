var auth = require('./auth'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

module.exports = function(app) {

  app.get('/api/users', auth.requireRole('admin'), function(req,res){
    User.find({}).exec(function(err,collection){
      res.send(collection);
    });
  });

      // Serve jade tempates from partials
  app.get('/partials/*', function(req, res){
    console.log(req.params);
    res.render('../../public/app/' + req.params[0]);

  });


  app.post('/login', auth.authenticate);
  app.post('/logout', function(req,res){
    req.logout();
    res.end();
  });


  app.get('*',function(req,res){
  //Message.find(function(err,messageDoc){
    res.render('index',{
       bootstrappedUser:req.user
    }

    );
  //});
  });

};