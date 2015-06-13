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
angular.module('mvg.local').controller('LocalCitiesController', function ($scope, $stateParams, CityList, CountryList) {
    $scope.country = $stateParams.country;
    $scope.cityList = new CityList($scope.country); // get the CityList model
    $scope.countryList = new CountryList(); // get the CountryList model
});
