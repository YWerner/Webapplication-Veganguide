/**
 * Controller for the Country List page.
 * 
 * @class app.countries.listCountriesController
 * @memberOf app.countries
 */

/**
 * Factory to create the controller.
 * 
 * @function factory
 * @memberOf app.countries.listCountriesController
 * @param {string} Controller name
 * @param {fn} Controller function
 * @param {object} $scope
 * @param {object} CountryList model
 */
 
ngApp.controller('listCountriesController', ['$scope', 'CountryList', function($scope, CountryList) {
	$scope.countryList = new CountryList(); // get the CountryList model
}]);
