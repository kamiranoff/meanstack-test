mainAngularApp.value('mvToastr',toastr);

mainAngularApp.factory('mvNotifier',function(mvToastr){
  return{
    success: function(msg){
      mvToastr.success(msg);
      console.log(msg);
    },
    warning: function(msg){
      mvToastr.warning(msg);
      console.log(msg);
    },
    error: function(msg){
      if(typeof msg === 'undefined'){
        msg = 'ok';
      }
      mvToastr.error(msg);
      console.log(msg);
    }
  };
});