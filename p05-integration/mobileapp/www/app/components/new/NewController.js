 /**
 * @ngdoc controller
 * @name app.new.NewController
 * @description
 * Controller for the new places  page.
 * 
 * @param {string} Controller name
 * @param {object} $scope
 * @param {object} New model
 */
angular.module('mvg.new', []).controller('NewController', function ($scope, New) {
    $scope.places = new New(); // get the New model
});
