/**
 * Service for communication with the API.
 *  
 * @class app.api.apiService
 * @memberOf app.api
 * @example apiService.listCountries(function(response) { var countries = response.data });	
 */

/**
 * Factory to create the controller.
 * 
 * @function factory
 * @memberOf app.api.apiService
 * @param {string} Service name
 * @param {fn} Service function
 * @param {object} $http
 */

ngApp.factory('apiService', ['$http', function($http) {
	return {
		/**
		 * URL to the API
		 * @var {string} URL
		 * @memberOf app.api.apiService 
		 */
		url: 'api/',

		/**
		 * API-key wich should be used to communicated with the API.
		 *
		 * @var {string} API-key
		 * @memberOf app.api.apiService
		 */
		apikey: '',

		/**
		 * Language wich should be returned by the API.
		 *
		 * @var {string} Language
		 * @memberOf app.api.apiService
		 */
		lang: 'de',

		/**
		 * Executes a callback with a list of all countries as parameter
		 *
		 * @function listCountries
		 * @memberOf app.api.apiService
		 * @see {@link http://veganguide.org/api|vg.browse.listCountries}
		 * @param {fn} callback - Function to execute
		 */
		listCountries: function(callback) {
			$http.get('api/JSON_Dummies/Countries.json').success(callback);
			//$http.get(this.url + "?apikey=" + this.apikey + "&lang=" + this.lang).success(callback);
		},

		/**
		 * Executes a callback with a list of all cities as parameter
		 *
		 * @function listCities
		 * @memberOf app.api.apiService
		 * @see {@link http://veganguide.org/api|vg.browse.listCities}
		 * @param {string} country - Cities should be in this country
		 * @param {fn} callback - Function to execute
		 */
		listCities: function(country, callback) {
			$http.get('api/JSON_Dummies/Cities_Germany.json').success(callback);
			//$http.get(this.url + "?apikey=" + this.apikey + "&lang=" + this.lang + "&country=" + country).success(callback);
		},

		/**
		 * Executes a callback with a list of all places as parameter
		 *
		 * @function listPlacesByCity
		 * @memberOf app.api.apiService
		 * @see {@link http://veganguide.org/api|vg.browse.listCities}
		 * @param {string} country - Cities should be in this country
		 * @param {string} city - Cities should be in this city
		 * @param {fn} callback - Function to execute
		 */
		listPlacesByCity: function(country, city, callback) {
			$http.get('api/JSON_Dummies/Lokale_Leipzig.json').success(callback);
			//$http.get(this.url + "?apikey=" + this.apikey + "&lang=" + this.lang + "&country=" + country + "&city=" + city).success(callback);
		}
	};
}]);
