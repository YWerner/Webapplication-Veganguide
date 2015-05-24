/**
 * @ngdoc object
 * @name app
 * @description
 * Init AngularJS app.
 * Dependences documanted in the parameter list.
 * 
 * @param {string} module name
 * @param {object} ngRoute
 * @param {object} ngAnimate
 * @param {object} ngOrderObjectBy
 * @param {object} ngStorage
 * @param {object} ngSanitize
 */
var ngApp = angular.module('app', ['ngRoute', 'ngAnimate', 'ngOrderObjectBy', 'ngStorage', 'ngSanitize']);

/**
 * @ngdoc method
 * @name run
 * @methodOf app
 */
ngApp.run(["$rootScope", "$location", "menuService", function($rootScope, $location, menuService) {
	// Component: menu
	$rootScope.$on('$routeChangeStart', function (event, next, current) { // a route is changedS
		menuService.route(event); // call routing from menu service
	});
}]);