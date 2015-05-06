/**
 * Data model for the country list.
 * Works as services and use
 *
 * @class app.countries.CountryList
 * @memberOf app.countries
 * @example var countryList = new CountryList();
 */

/**
 * Factory to create the model.
 * 
 * @function factory
 * @memberOf app.countries.CountryList
 * @param {string} Service name
 * @param {string} apiService
 * @param {fn} Factory function
 * @returns {object} CountryList 
 */
ngApp.factory('CountryList', ['apiService', '$filter', function(apiService, $filter) {
	var CountryList = function() {
		/**
		 * Constructor. 
		 * Use load() to fetch the countries.
		 * 
		 * @function initialize
		 * @memberOf app.countries.CountryList
		 */
		this.initialize = function() {
			this.load();
		};

		/**
		 * Load the country list using the API.
		 * Does also some changes to the data (duplicates get discarded and so on).
		 * Extends the object so that the data is in countryList.data
		 * 
		 * @function load
		 * @memberOf app.countries..CountryList
		 * @example countryList.load(); $scope.countries = countryList.data;
		 */
		this.load = function() {
			var self = this; // to reach 'this' in the callback
			apiService.listCountries(function(response) { // get data using api
				response.data = $filter('unique')(response.data, 'name'); // discarded duplicate entries by name
				response.data = $filter('noFaulty')(response.data, 'name'); // discard entries beginning with a '!'
				angular.extend(self, response); // inject data back
			});	
		};

		/**
		 * Returns a country by identifier
		 * 
		 * @function getById
		 * @memberOf app.countries.CountryList
		 * @param {string} id - Identifier of the Country
		 * @returns {object} country - Country object
		 */
		this.getById = function(id) {
			var country = {}; // default result
			if(this.data) { // data is not null
				for (var i = 0, len = this.data.length; i < len; i++) { // loop
					if (this.data[i].name === id) { // match the searched id
						country = this.data[i].name; // store to result
						break; // exit loop
					}
				}
			}
			return country;
		};

		/**
		 * Call constructor. 
		 */
		this.initialize();
	};
	return (CountryList);
}]);
