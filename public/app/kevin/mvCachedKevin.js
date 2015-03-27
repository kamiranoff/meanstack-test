angular.module('app').factory('mvCachedKevin', function (mvKevin) {
  var kevininfo;

  return {
    query: function(){
      if(!kevininfo){
        kevininfo = mvKevin.query();
      }
      return kevininfo;
    }
  };
});