 /**
 * @ngdoc controller
 * @name app.place.placeController
 * @description
 * Controller for the place page.

 */
angular.module('mvg.place', []).controller('PlaceController', function ($scope, $stateParams, $timeout, $ionicScrollDelegate, Place) {
    $scope.place = new Place($stateParams.place); // get the Place model
    $scope.showComments = false; // dont show comments as page loads
    $scope.toggleComments = function () { // trigger for comments loading
        if ($scope.place.comments === undefined) { // first call
            $scope.place.getComments(); // load comments
        }
        $scope.showComments = !$scope.showComments; // toggle state if to show or hide the comments
        $timeout(function () { // scroll to first entry -> ToDo: should be improved
            $ionicScrollDelegate.scrollBy(0, 250, true); // scroll down 250px
        }, 750); // after 750ms, so DOM already created
    };
    $scope.$watch('place.data', function (value) {  // watch for changes on the data of place
        // create a collectio of numbers long as the rating amount, for repeat the stars in the template
        $scope.rating = [];
        for (i = 1; i <= $scope.place.data.rating.rating; i++) {
            $scope.rating.push(i);
        }
    });

});
