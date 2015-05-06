/**
 * Controller for the City list page.
 * 
 * @class app.cities.listCitiesController
 * @memberOf app.cities
 */

/**
 * Factory to create the controller.
 * 
 * @function factory
 * @memberOf app.countries.listCitiesController
 * @param {string} Controller name
 * @param {fn} Controller function
 * @param {object} $scope
 * @param {object} $filter
 * @param {object} $routeParams
 * @param {object} CityList model
 * @param {object} CountryList model
 */
 
 
ngApp.controller('listCitiesController', ['$scope', '$filter', '$routeParams', 'CityList', 'CountryList', function($scope, $filter, $routeParams, CityList, CountryList){
	$scope.cityList = new CityList($routeParams.country); // get the CityList model
	$scope.countryList = new CountryList(); // get the CountryList model
	$scope.country = $routeParams.country;
	/*
	$http.get('api/JSON_Dummies/Cities_Germany.json').success (function(result){ // Load Cities using a API-call wich returns JSOn data
		$scope.cities = result.data; // put list of Cities into scope
	});
	*/
}]);
