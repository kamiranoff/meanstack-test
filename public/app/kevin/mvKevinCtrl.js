angular.module('app').controller('mvKevinCtrl',function($scope,mvCachedKevin){
  $scope.kevin = mvCachedKevin.query();
});