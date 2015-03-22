var express = require('express'),
path = require('path'),
session = require('express-session'),
cookieParser = require('cookie-parser'),
passport = require('passport'),
bodyParser = require('body-parser');

module.exports = function(app,config) {
  // body...
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(bodyParser.json());

  app.use(express.static(path.join(config.rootPath, 'public')));

  app.use(session({
    secret:'meanstack',
    resave:true,
    saveUninitialized:true
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  app.set('views', config.rootPath + '/server/views');
  app.set('view engine','jade');
  app.set('view options', {
    layout: false
  });

};
