/**
 * Controller for the Place List page
 */

ngApp.controller('listPlacesController',function($scope, $http, $filter, $routeParams){
	$http.get('api/JSON_Dummies/Lokale_Leipzig.json').success (function(result){ // Load Places using a API-call wich returns JSOn data
		$scope.places = result; // put list of Places into scope
	});
});
