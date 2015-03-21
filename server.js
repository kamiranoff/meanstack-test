var express = require('express'),
    mongoose = require('mongoose');

var app = express();

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
env = 'development';
var config = require('./server/config/config')[env];

require('./server/config/express')(app,config);
require('./server/config/mongoose')(config);
require('./server/config/routes')(app);
require('./server/config/logs')(app);



app.listen(config.port);
console.log('Listening on port '+config.port+ '...');



