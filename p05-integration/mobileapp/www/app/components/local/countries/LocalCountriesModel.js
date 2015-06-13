/**
 * @ngdoc service
 * @name app.list.countries.CountryList
 * @description
 * Data model for the country list.
 * Works as services.
 * Is created by a self-named factory.
 * 
 * @param {string} Service name
 * @param {string} ApiService
 * @param {fn} Factory function with any parameter defined so far
 * @returns {object} PlaceList 
 */
angular.module('mvg.local').factory('CountryList', ['ApiService', function (ApiService) {

	/**
	 * @ngdoc function
	 * @name CountryList
	 * @methodOf app.list.countries.CountryList
	 * @description
	 * Factory to create a CountryList.
	 * Creates the object and load the data using the API.
	 *
	 * @returns {object} CountryList
	 */
	var CountryList = function() {

		/**
		 * @ngdoc method
		 * @name initialize
		 * @methodOf app.list.countries.CountryList
		 * @description
		 * Constructor. 
		 * Use load() to fetch the countries.
		 */
		this.initialize = function() {
			this.load();
		};

		/**
		 * @ngdoc method
		 * @name load
		 * @methodOf app.list.countries.CountryList
		 * @description
		 * Load the country list using the API.
		 * Does also some changes to the data (duplicates get discarded and so on).
		 * Extends the object so that the data is in CityList.data
		 */
		this.load = function() {
			var self = this; // to reach 'this' in the callback
			ApiService.listCountries(function (response) { // get data using api
			    angular.extend(self, response); // inject data back
			});	
		};

		/** 
		 * @ngdoc method
		 * @name getById
		 * @methodOf app.list.countries.CountryList
		 * @description
		 * Returns a country by his identifier.
		 *
		 * @param {string} id - Identifier of the Country
		 * @returns {object} country - Country object
		 */
		this.getById = function(id) {
			var country = {}; // default result
			if(this.data) { // data is defined
				for (var i = 0, len = this.data.length; i < len; i++) { // loop
					country = this.data[i];
					if (this.data[i].identifier === id) { // match the searched id
						country = this.data[i]; // store to result
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
