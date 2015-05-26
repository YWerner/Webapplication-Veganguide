/**
 * Routes 
 */
ngApp.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
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
			// Place detail page
			when('/place/:place', {
				templateUrl: 'app/components/place/placeView.html',
				controller: 'PlaceController'
			}).
			// Default
			otherwise({
				redirectTo: '/local'
			});
  }]);