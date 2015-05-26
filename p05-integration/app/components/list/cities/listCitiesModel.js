/**
 * @ngdoc service
 * @name app.list.cities.CityList
 * @description
 * Data model for the city list.
 * Works as services.
 * Is created by a self-named factory.
 * 
 * @param {string} Service name
 * @param {string} apiService
 * @param {fn} Factory function with any parameter defined so far
 * @returns {object} CityList 
 */
ngApp.factory('CityList', ['apiService', function(apiService) {

	/**
	 * @ngdoc function
	 * @name CityList
	 * @methodOf app.list.countries.CityList
	 * @description
	 * Factory to create a CityyList.
	 * Creates the object and load the data using the API.
	 *
	 * @param {string} country - Cities should be in this country
	 * @returns {object} CountryList
	 */
	var CityList = function(country) {

		/**
		 * @ngdoc method
		 * @name initialize
		 * @methodOf app.list.cities.CityList
		 * @description
		 * Constructor. 
		 * Use load() to fetch the cities.
		 *
		 * @param {string} country - Places should be in this country
		 */
		this.initialize = function(country) {
			this.load(country);
		};

		/**
		 * @ngdoc method
		 * @name load
		 * @methodOf app.list.cities.CityList
		 * @description
		 * Load the country list using the API.
		 * Does also some changes to the data (duplicates get discarded and so on).
		 * Extends the object so that the data is in CityList.data
		 *
		 * @param {string} country - Places should be in this country
		 */
		this.load = function(country) {
			var self = this; // to reach 'this' in the callback
			apiService.listCities(country, function(response) { // get data using api
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
