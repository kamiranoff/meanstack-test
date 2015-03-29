mainAngularApp.factory('mvCachedTeams', function (mvTeams) {
  var teamList;

  return {
    query: function(){
      if(!teamList){
        teamList = mvTeams.query();
      }
      return teamList;
    }
  };
});