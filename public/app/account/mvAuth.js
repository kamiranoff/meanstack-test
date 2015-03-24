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
    createUser: function(newUserData){
      var newUser = new mvUser(newUserData);
      console.log(newUser);
      var dfd = $q.defer();

      newUser.$save().then(function(){
        mvIdentity.currentUser = newUser;
        dfd.resolve();
      },
      function(response){
        console.log(response);
        dfd.reject(response.data.reason);
      });

      return dfd.promise;
    },
    updateCurrentUser: function(newUserData){
      var dfd = $q.defer();
      var clone = angular.copy(mvIdentity.currentUser);
      angular.extend(clone,newUserData);
      clone.$update().then(function(){
        mvIdentity.currentUser = clone;
        dfd.resolve();
      },function(response){
         dfd.reject(response.data.reason);
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
    },
    authorizeCurrentUserForRoute:function(role){
      if(mvIdentity.isAuthorized(role)){
        console.log('admin baby !');
        return true;
      }else{
        console.log('not authorized');
        return $q.reject('not authorized');
      }
    },
    authorizeAuthenticatedCurrentUserForRoute:function(){
      if(mvIdentity.isAuthenticated()){
        return true;
      }else{
        return $q.reject('not authorized');
      }
    }
  };
});