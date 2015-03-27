angular.module('app').factory('mvKevin',function($resource){
  var kevinResource = $resource('api/kevin');

  return kevinResource;
});