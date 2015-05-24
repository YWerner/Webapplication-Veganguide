 /**
 * @ngdoc controller
 * @name listPlacesController
 * @description
 * Controller for the Place list page.
 * 
 * @param {string} Controller name
 * @param {object} $scope
 * @param {object} $rootScope
 * @param {object} $filter
 * @param {object} $routeParams
 * @param {object} PlaceList model
 * @param {fn} Factory function with any parameter defined so far
 */
ngApp.controller('listPlacesController', ['$scope', '$rootScope', '$filter', '$routeParams', 'PlaceList', function($scope, $rootScope, $filter, $routeParams, PlaceList){
	$scope.countryId = $routeParams.country; // get countryId from url
	$rootScope.pageBack = "#/local/" + $scope.countryId; // set back link to the list of citys in the current country
	$scope.placeList = new PlaceList($scope.countryId, $routeParams.city); // get the PlaceList model
	$scope.$watch('placeList.data', function(value) {  // watch for changes on the data of placeList
		$rootScope.pageTitle = $scope.placeList.getCity(); // change page title to the current city
	});
}]);
