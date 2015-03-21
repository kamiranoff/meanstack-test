
module.exports = function(app) {

      // Serve jade tempates from partials
  app.get('/partials/*', function(req, res){
    console.log(req.params);
  res.render('../../public/app/' + req.params[0]);
});


  app.get('/',function(req,res){
  //Message.find(function(err,messageDoc){
    res.render('index'
    //,{mongoMessage: messageDoc[1].message}
    );
  //});
  });

};