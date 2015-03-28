mainAngularApp.controller('mvUserListCtrl', function($scope,mvUser){
  $scope.users = mvUser.query();
});