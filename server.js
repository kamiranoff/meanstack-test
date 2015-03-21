var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    app = express();

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
env = 'development';
var config = require('./server/config/config')[env];

require('./server/config/express')(app,config);
require('./server/config/mongoose')(config);
require('./server/config/routes')(app);




app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.listen(config.port);
console.log('Listening on port '+config.port+ '...');



