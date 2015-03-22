var express = require('express'),
    sassMiddleware = require('node-sass-middleware'),
    path = require('path');


module.exports = function(app,config){
  // body...
  app.use(sassMiddleware({
    src: __dirname,
    dest: path.join(__dirname, 'public'),
    debug: true,
    outputStyle: 'nested',
    prefix:  '/prefix'
  }));
//!SASS
};
//SASS
