 /**
 * @ngdoc controller
 * @name ListCountriesController
 * @description
 * Controller for the Country list page.
 * 
 * @param {string} Controller name
 * @param {object} $scope
 * @param {PlaceList} CountryList model
 */

angular.module('mvg.local', []).controller('LocalCountriesController', function ($scope, CountryList) {
    // Get data model
    $scope.countryList = new CountryList();
});
