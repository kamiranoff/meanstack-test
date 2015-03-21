var bodyParser = require('body-parser'),
    morgan = require('morgan');

module.exports = function(app){
  app.use(morgan('combined'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
};