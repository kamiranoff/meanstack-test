mainAngularApp.controller('mvNavBarLoginCtrl',function($scope,$http,mvIdentity,mvNotifier,mvAuth,$location){
  $scope.identity = mvIdentity;
  $scope.signin = function(userName,password){
    mvAuth.authenticateUser(userName,password).then(function(success){
      if(success){
        mvNotifier.success('You have successfully signed in');
      }else{
        mvNotifier.warning('Still not logged in ?');
      }
    });


  };
  $scope.signout = function(){
    mvAuth.logoutUser().then(function(){
      $scope.userName= "";
      $scope.password= "";
      mvNotifier.success('Bye, bye. Have a nice day.');
      $location.path('/');
    });
  };
});