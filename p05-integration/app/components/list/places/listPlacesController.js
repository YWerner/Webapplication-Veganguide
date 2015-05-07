/**
 * Controller for the Place list page.
 * 
 * @class app.list.places.listCitiesController
 * @memberOf app.list.cities
 */

/**
 * Factory to create the controller.
 * 
 * @function factory
 * @memberOf app.list.places.listCitiesController
 * @param {string} Controller name
 * @param {fn} Controller function
 * @param {object} $scope
 * @param {object} $filter
 * @param {object} $routeParams
 * @param {PlaceList} PlaceList model
 */ 
ngApp.controller('listPlacesController', ['$scope', '$filter', '$routeParams', 'PlaceList', function($scope, $filter, $routeParams, PlaceList){
	$scope.placeList = new PlaceList($routeParams.country, $routeParams.city); // get the PlaceList model
	$scope.countryId = $routeParams.country;
}]);

/*
ngApp.controller('listPlacesController',function($scope, $http, $filter, $routeParams){
	$http.get('api/JSON_Dummies/Lokale_Leipzig.json').success (function(result){ // Load Places using a API-call wich returns JSOn data
		$scope.places = result; // put list of Places into scope
	});
});
*/