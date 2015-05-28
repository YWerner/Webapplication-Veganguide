 /**
 * @ngdoc controller
 * @name listCountriesController
 * @description
 * Controller for the Country list page.
 * 
 * @param {string} Controller name
 * @param {object} $scope
 * @param {object} $rootScope
 * @param {PlaceList} CountryList model
 * @param {fn} Factory function with any parameter defined so far
 */
ngApp.controller('listCountriesController', ['$scope', '$rootScope', 'CountryList', function($scope, $rootScope, CountryList) {
	$rootScope.pageTitle = "Alle Orte"; // set page tilte
	$rootScope.menu.clear(); // set no back link in the header
	$scope.countryList = new CountryList(); // get the CountryList model
}]);
