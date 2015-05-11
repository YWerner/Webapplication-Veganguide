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
