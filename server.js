var express = require('express'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    //SASS
    sassMiddleware = require('node-sass-middleware'),
    path = require('path'),
    //!SASS
    app = express(),
    db = mongoose.connection;


    port = 3030;

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';


//SASS
app.use(sassMiddleware({
    src: __dirname,
    dest: path.join(__dirname, 'public'),
    debug: true,
    outputStyle: 'nested',
    prefix:  '/prefix'
}));
//!SASS

if ('development' == env) {
  app.set('views', __dirname + '/server/views');
  app.set('view engine','jade');

  app.use(express.static(path.join(__dirname, 'public')));
  app.use(morgan('combined'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
}


var messageSchema = mongoose.Schema({message:String});
var Message = mongoose.model('Message',messageSchema);
var mongoMessage;
//db = mongoose.connection
mongoose.connect('mongodb://localhost/meanstack');
db.on('error',console.error.bind(console,'connection error ...'));
db.once('open',function callback(){
  console.log('db is opened');

});



app.get('/partials/:partialPath',function(req,res){
  res.render('partials/'+req.params.partialPath);
});


app.get('*',function(req,res){
  Message.find(function(err,messageDoc){
    res.render('index',{
      mongoMessage: messageDoc[1].message
    });
  });

});



app.listen(port);
console.log('Listening on port '+port+ '...');



