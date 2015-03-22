angular.module('app').value('mvToastr',toastr);

angular.module('app').factory('mvNotifier',function(mvToastr){
  return{
    success: function(msg){
      mvToastr.success(msg);
      console.log(msg);
    },
    warning: function(msg){
      mvToastr.warning(msg);
      console.log(msg);
    }
  };
});