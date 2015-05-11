/**
 * Data model for the city list.
 * Works as services.
 *
 * @class app.cities.CityList
 * @memberOf app.cities
 * @example var CityList = new CityList('germany');
 */

/**
 * Factory to create the model.
 * 
 * @function factory
 * @memberOf app.cities.CityList
 * @param {string} Service name
 * @param {string} apiService
 * @param {fn} Factory function
 * @returns {object} CityList 
 */
ngApp.factory('CityList', ['apiService', '$filter', function(apiService, $filter) {
	var CityList = function(country) {

		/**
		 * Constructor. 
		 * Use load() to fetch the cities.
		 * 
		 * @function initialize
		 * @memberOf app.CityList
		 * @param {string} country - Cities should be in this country
		 */
		this.initialize = function(country) {
			this.load(country);
		};

		/**
		 * Load the country list using the API.
		 * Does also some changes to the data (duplicates get discarded and so on).
		 * Extends the object so that the data is in CityList.data
		 * 
		 * @function load
		 * @memberOf app.CityList
		 * @param {string} country - Cities should be in this country
		 */
		this.load = function(country) {
			var self = this; // to reach 'this' in the callback
			apiService.listCities(country, function(response) { // get data using api
				response.data = $filter('unique')(response.data, 'name'); // discarded duplicate entries by name
				response.data = $filter('noFaulty')(response.data, 'name'); // discard entries beginning with a '!'
				angular.extend(self, response); // inject data back
			});	
		};

		/**
		 * Call constructor. 
		 */
		this.initialize(country);
	};
	return (CityList);
}]);
