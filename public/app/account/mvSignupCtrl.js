angular.module('app').controller('mvSignupCtrl', function($scope,mvUser,mvNotifier,$location,mvAuth){
  $scope.signup = function(){
    var newUserData = {
      userName : $scope.userName,
      email : $scope.email,
      password : $scope.password,
      firstName : $scope.fname,
      lastName : $scope.lname
    };
    console.log(newUserData);

    mvAuth.createUser(newUserData).then(function(){
      mvNotifier.success('Welcome aboard fellow!');
      $location.path('/');
    }, function(reason){
      mvNotifier.error(reason);
    });
  };
});