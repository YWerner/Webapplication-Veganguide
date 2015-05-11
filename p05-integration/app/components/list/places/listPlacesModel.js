/**
 * Data model for the place list.
 * Works as services.
 *
 * @class app.list.places.CityList
 * @memberOf app.list.places
 * @example var PlaceList = new PlaceList();
 */

/**
 * Factory to create the model.
 * 
 * @function factory
 * @memberOf app.list.places.CityList
 * @param {string} Service name
 * @param {string} apiService
 * @param {fn} Factory function
 * @returns {object} PlaceList 
 */
ngApp.factory('PlaceList', ['apiService', '$filter', function(apiService, $filter) {
	/**
	 * Factory to create a PlaceList .
	 * 
	 * @function PlaceList
	 * @param {string} country
	 * @returns {PlaceList}
	 * @param {string} country - Places should be in this country
	 * @param {string} city - Places should also be in this city
	 */
	var PlaceList = function(country, city) {
		/**
		 * Constructor. 
		 * Use load() to fetch the places.
		 * 
		 * @function initialize
		 * @memberOf app.list.places.CityList
		 * @param {string} country - Places should be in this country
		 * @param {string} city - Places should also be in this city
		 */
		this.initialize = function(country, city) {
			this.load(country, city);
		};

		/**
		 * Load the country list using the API.
		 * Does also some changes to the data (duplicates get discarded and so on).
		 * Extends the object so that the data is in CityList.data
		 * 
		 * @function load
		 * @memberOf app.list.places.CityList
		 * @param {string} country - Places should be in this country
		 * @param {string} city - Places should also be in this city
		 */
		this.load = function(country, city) {
			var self = this; // to reach 'this' in the callback
			apiService.listPlacesByCity(country, city, function(response) { // get data using api
				response.data = $filter('unique')(response.data, 'name'); // discarded duplicate entries by name
				response.data = $filter('noFaulty')(response.data, 'name'); // discard entries beginning with a '!'
				angular.extend(self, response); // inject data back
			});	
		};

		/**
		 * Call constructor. 
		 */
		this.initialize(country, city);
	};
	return (PlaceList);
}]);
