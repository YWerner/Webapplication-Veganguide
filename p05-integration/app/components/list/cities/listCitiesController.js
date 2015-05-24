/**
 * @ngdoc controller
 * @name listCitiesController
 * @description
 * Controller for the city list page.
 * 
 * @param {string} Controller name
 * @param {object} $scope
 * @param {object} $rootScope
 * @param {object} $filter
 * @param {object} $routeParams
 * @param {object} CityList model
 * @param {object} CountryList model
 * @param {fn} Factory function with any parameter defined so far
 */
ngApp.controller('listCitiesController', ['$scope', '$rootScope', '$filter', '$routeParams', 'CityList', 'CountryList', function($scope, $rootScope, $filter, $routeParams, CityList, CountryList){
	$scope.country = $routeParams.country; // get current country from url route
	$rootScope.pageTitle = "Städte"; // set page title to a default
	$rootScope.pageBack = "#/local"; // set back link to the list of countries
	$scope.cityList = new CityList($routeParams.country); // get the CityList model
	$scope.countryList = new CountryList(); // get the CountryList model
	$scope.$watch('countryList.data', function(value) {  // watch for changes on the data of countryList
		$rootScope.pageTitle = $scope.countryList.getById($scope.country).name; // change page title to the real name of this country
	});
}]);
