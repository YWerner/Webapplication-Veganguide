 /**
 * @ngdoc controller
 * @name app.place.placeController
 * @description
 * Controller for the place page.
 * 
 * @param {string} Controller name
 * @param {object} $scope
 * @param {object} $rootScope
 * @param {object} $routeParams
 * @param {object} Place model
 * @param {fn} Factory function with any parameter defined so far
 */
ngApp.controller('PlaceController', ['$scope', '$rootScope', '$routeParams', 'Place', function($scope, $rootScope, $routeParams, Place){
	$rootScope.pageTitle = "Lokal"; // default page title
	$rootScope.pageBack = ""; // no back link currently
	$scope.showComments = false; // dont show comments as page loads
	$scope.place = new Place($routeParams.place); // get the Place model
	$scope.$watch('place.data', function(value) {  // watch for changes on the data of place
		$rootScope.pageTitle = $scope.place.data.name; // change page title to the current place name
	});
	$scope.comments = function() { // trigger for comments loading
		if($scope.place.comments === undefined) { // first call
			$scope.place.getComments(); // load comments
		}
		$scope.showComments = !$scope.showComments; // toggle state if to show or hide the comments
	};
}]);
