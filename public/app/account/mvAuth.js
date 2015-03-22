angular.module('app').factory('mvAuth',function($http,mvIdentity,$q,mvUser){
  return{
    authenticateUser: function(userName,password){
      var dfd = $q.defer();
      $http.post('/login',{userName:userName,password:password}).then(function(response){
      console.log(response);
      if(response.data.success){
        var user = new mvUser();
        angular.extend(user,response.data.user);
        mvIdentity.currentUser = user;
        dfd.resolve(true);
      }else{
        dfd.resolve(false);
      }
    });
    return dfd.promise;
    },
    logoutUser: function(){
      var dfd = $q.defer();
      $http.post('/logout', {logout:true}).then(function(){
        mvIdentity.currentUser = undefined;
        dfd.resolve();
      });
      return dfd.promise;
    }
  };
});