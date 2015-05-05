/**
 * Controller for the City List page
 */

ngApp.controller('listCitiesController',function($scope, $http, $filter, $routeParams){
	$http.get('api/JSON_Dummies/Cities_Germany.json').success (function(result){ // Load Cities using a API-call wich returns JSOn data
		$scope.cities = result.data; // put list of Cities into scope
	});
});
