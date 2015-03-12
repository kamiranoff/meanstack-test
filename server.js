var express = require('express');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();
var express = require('express');

var morgan = require('morgan');
var bodyParser = require('body-parser');

//SASS
var sassMiddleware = require('node-sass-middleware');
var path = require('path');
var app = express();
app.use(sassMiddleware({
    src: __dirname,
    dest: path.join(__dirname, 'public'),
    debug: true,
    outputStyle: 'nested',
    prefix:  '/prefix'
}));

//END SASS

if ('development' == env) {
  app.set('views', __dirname + '/server/views');
  app.set('view engine','jade');


  app.use(express.static(path.join(__dirname, 'public')));
  app.use(morgan('combined'));

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
}

app.get('/',function(req,res){
  res.render('index');
});

var port= 3030;
app.listen(port);
console.log('Listening on port '+port+ '...');