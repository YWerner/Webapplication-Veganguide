/**
 * Routes 
 */
ngApp.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
			// Menu
			when('/menu', {
				templateUrl: 'app/components/menu/menuView.html',
				controller: 'menuController',
			}).
			// List of Countries
			when('/local', {
				templateUrl: 'app/components/list/countries/listCountriesView.html',
				controller: 'listCountriesController',
			}).
			// List of Cities
			when('/local/:country', {
				templateUrl: 'app/components/list/cities/listCitiesView.html',
				controller: 'listCitiesController'
			}).
			// List of Places
			when('/local/:country/:city', {
				templateUrl: 'app/components/list/places/listPlacesView.html',
				controller: 'listPlacesController'
			}).
			// Default
			otherwise({
				redirectTo: '/menu'
			});
  }]);