var auth = require('./auth'),
    users = require('../controllers/users'),
    bodyParser = require('body-parser'),
    courses = require('../controllers/courses'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    kevininfo = require('../controllers/kevininfo');
    Kevin = mongoose.model('Kevin');

module.exports = function(app) {

  app.get('/api/users', auth.requireRole('admin'),users.getUsers);
  app.post('/api/users', users.createUser);
  app.put('/api/users', users.updateUser);

  app.get('/api/courses', courses.getCourses);
  app.get('/api/courses/:id', courses.getCourseById);
  app.get('/api/kevin', kevininfo.getKevinInfo);

  // Serve jade tempates from partials
  app.get('/partials/*', function(req, res){
    res.render('../../public/app/' + req.params[0]);

  });



  app.post('/login', auth.authenticate);
  app.post('/logout', function(req,res){
    req.logout();
    res.end();
  });

  app.all('/api/*',function(req,res){
    res.send(404);
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