mainAngularApp.controller('mvMainCtrl',function($scope, mvCachedCourses){
  $scope.courses = mvCachedCourses.query();
});