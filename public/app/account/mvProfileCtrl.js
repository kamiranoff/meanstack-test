mainAngularApp.controller('mvProfileCtrl',function($scope,mvAuth,mvIdentity,mvNotifier){
  $scope.userName = mvIdentity.currentUser.userName;
  $scope.email = mvIdentity.currentUser.email;
  $scope.fname = mvIdentity.currentUser.firstName;
  $scope.lname = mvIdentity.currentUser.lastName;

  $scope.update = function(){
    var newUserData = {
      userName:$scope.userName,
      email:$scope.email,
      firstName:  $scope.fname,
      lastName:$scope.lname
      };
    if($scope.password && $scope.password.length > 0){
      newUserData.password = $scope.password;
    }

    mvAuth.updateCurrentUser(newUserData).then(function(){
      mvNotifier.success('Your user account has been updated');
    },function(reason){
      mvNotifier.error(reason);
    });
  };

});