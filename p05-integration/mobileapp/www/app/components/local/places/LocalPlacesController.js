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
angular.module('mvg.local').controller('LocalPlacesController', function ($scope, $stateParams, PlaceList) {
    $scope.placeList = new PlaceList($stateParams.country, $stateParams.city); // get the PlaceList model
    $scope.$watch('placeList.data', function (value) {  // watch for changes on the data of placeList
        $scope.city = $scope.placeList.getCity();
    });
});
