/**
 * Service for communication with the API 
 */

ngApp.module('apiService', []).config(['$provide', function($provide) {
  $provide.factory('api', function() {
    var api; // create a object to return
    return api; // factoryto  create this object
  });
}]);