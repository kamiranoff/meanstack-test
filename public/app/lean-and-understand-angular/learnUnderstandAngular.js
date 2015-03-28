mainAngularApp.controller('mvLearnCtrl',['$scope','$log','$filter',function($scope,$log,$filter){
  $scope.title = 'Learn and understand AngularJS ';
  $scope.how = function(time,speed){
    return time/speed;
  };
  $scope.filtering = $filter('uppercase')($scope.title);

  $scope.handle ='';

  $scope.characters = 5;

  $log.log("log");
  $log.info($scope.filtering);
  $log.warn('Warning');
  $log.debug('Some Debugging ?');
  $log.error('huge mistake');

}]);



