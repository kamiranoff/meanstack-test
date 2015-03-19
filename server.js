var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    //SASS
    sassMiddleware = require('node-sass-middleware'),
    path = require('path'),
    //!SASS
    app = express(),
    db = mongoose.connection,
    port = process.env.PORT || 3030;

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
    env = 'development';

//SASS
app.use(sassMiddleware({
    src: __dirname,
    dest: path.join(__dirname, 'public'),
    debug: true,
    outputStyle: 'nested',
    prefix:  '/prefix'
}));
//!SASS



  app.use(express.static(path.join(__dirname, 'public')));
  app.use(morgan('combined'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.set('views', __dirname + '/server/views');
  app.set('view engine','jade');
  app.set('view options', {
    layout: false
  });


// var messageSchema = mongoose.Schema({message:String});
// var Message = mongoose.model('Message',messageSchema);
// var mongoMessage;

//db = mongoose.connection
if(env === 'development'){
 mongoose.connect('mongodb://localhost/meanstack');
 var msg = 'local db';
}else{
mongoose.connect('kamiranoff:Jenifer75@ds027479.mongolab.com:27479/meanstack');
  msg = 'prod db';
}
db.on('error',console.error.bind(console,'connection error ...'));
db.once('open',function callback(){
  console.log(msg + ' is opened');

});




app.get('/partials/:partialPath',function(req,res){
  res.render('partials/'+req.params.partialPath);
});


app.get('/',function(req,res){
  //Message.find(function(err,messageDoc){
    res.render('index'
      //,{mongoMessage: messageDoc[1].message}
      );
  //});

});


app.listen(port);
console.log('Listening on port '+port+ '...');



