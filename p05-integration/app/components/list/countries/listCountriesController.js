/**
 * Controller for the Country List page
 */

ngApp.controller('listCountriesController',function($scope, $http, $filter){
	$http.get('api/JSON_Dummies/Countries.json').success (function(result){ // Load countries using a API-call wich returns JSOn data
		$scope.countries = result.data; // put list of countries into scope
	});
});
