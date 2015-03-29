mainAngularApp.factory('mvTeams', function($resource){
  var teamResource = $resource('comicvine/all_teams_details');
  return teamResource;
});