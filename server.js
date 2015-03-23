var express = require('express');

var app = express();

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./server/config/config')[env];

require('./server/config/express')(app, config);

require('./server/config/mongoose')(config);

require('./server/config/logs')(app);

require('./server/config/passport')();


// this middleware will be executed for every request to the app
app.use(function (req, res, next) {
  console.log('Time: %d', Date.now());
  next();
});



require('./server/config/routes')(app);
app.listen(config.port);
console.log('Listening on port ' + config.port + '...');
