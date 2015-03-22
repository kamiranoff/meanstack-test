var auth = require('./auth'),
    bodyParser = require('body-parser');

module.exports = function(app) {

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


  app.get('/',function(req,res){
  //Message.find(function(err,messageDoc){
    res.render('index',{
       bootstrappedUser:req.user
    }

    );
  //});
  });

};