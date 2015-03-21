var express = require('express'),
path = require('path');

module.exports = function(app,config) {
  // body...
app.use(express.static(path.join(config.rootPath, 'public')));
app.set('views', config.rootPath + '/server/views');
app.set('view engine','jade');
app.set('view options', {
  layout: false
});
};
