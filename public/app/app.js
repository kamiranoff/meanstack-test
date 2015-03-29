var mainAngularApp = angular.module('app', ['ngResource','ngRoute']);

mainAngularApp.config(function($routeProvider,$locationProvider){
  var routeRoleChecks = {
    admin:{
        auth: function(mvAuth){
          return mvAuth.authorizeCurrentUserForRoute('admin');
        }
    },
    user:{
      auth:function(mvAuth){
        return mvAuth.authorizeAuthenticatedCurrentUserForRoute();
      }
    }
  };

  $locationProvider.html5Mode(true);
  $routeProvider
    .when('/',{
      templateUrl: '/partials/main/main',
      controller:'mvMainCtrl'
    })
    .when('/admin/users',{
      templateUrl: '/partials/admin/user-list',
      controller:'mvUserListCtrl',
      resolve: routeRoleChecks.admin
    })
    .when('/signup',{
      templateUrl:'/partials/account/signup',
      controller:'mvSignupCtrl'
    })
    .when('/profile', {
      templateUrl: '/partials/account/profile',
      controller: 'mvProfileCtrl',
      resolve: routeRoleChecks.user
    })
    .when('/courses',{
      templateUrl: '/partials/courses/course-list',
      controller: 'mvCourseListCtrl',
    })
    .when('/courses/:id',{
      templateUrl: '/partials/courses/course-details',
      controller: 'mvCourseDetailCtrl',
    }).when('/about/kevin',{
      templateUrl: '/partials/kevin/kevin',
      controller: 'mvKevinCtrl',
    }).when('/learn-understand-angular',{
      templateUrl: '/partials/learn-and-understand-angular/angular1',
      controller: 'mvLearnCtrl',
    });
});

mainAngularApp.run(function($rootScope,$location){
  console.log($location);
    console.log('running');
  $rootScope.$on('$routeChangeError',function(evt,current,previous,rejection){
    console.log();
    console.log('rejection: ' + rejection);
        if(rejection === 'not authorized'){
      $location.path('/');
    }
  });
});