/**
 * @ngdoc service
 * @name app.list.places.PlaceList
 * @description
 * Data model for the place list.
 * Works as services.
 * Is created by a self-named factory.
 * 
 * @param {string} Service name
 * @param {string} ApiService
 * @param {fn} Factory function with any parameter defined so far
 * @returns {object} PlaceList 
 */
angular.module('mvg.local').factory('PlaceList', ['ApiService', function(ApiService) {

	/**
	 * @ngdoc function
	 * @name PlaceList
	 * @methodOf app.list.places.PlaceList
	 * @description
	 * Factory to create a PlaceList.
	 * Creates the object and load the data using the API.
	 *
	 * @param {string} country - Places should be in this country
	 * @param {string} city - Places should also be in this city
	 * @returns {object} PlaceList
	 */
	var PlaceList = function(country, city) {

		/**
		 * @ngdoc method
		 * @name initialize
		 * @methodOf app.list.places.PlaceList
		 * @description
		 * Constructor. 
		 * Use load() to fetch the places.
		 *
		 * @param {string} country - Places should be in this country
		 * @param {string} city - Places should also be in this city
		 */
		this.initialize = function(country, city) {
			this.load(country, city);
		};

		/**
		 * @ngdoc method
		 * @name load
		 * @methodOf app.list.places.PlaceList
		 * @description
		 * Load the place list using the API.
		 * Does also some changes to the data (duplicates get discarded and so on).
		 * Extends the object so that the data is in PlaceList.data
		 *
		 * @param {string} country - Places should be in this country
		 * @param {string} city - Places should also be in this city
		 */
		this.load = function(country, city) {
			var self = this; // to reach 'this' in the callback
			ApiService.listPlacesByCity(country, city, function(response) { // get data using api
				angular.extend(self, response); // inject data back
			});	
		};

		/**
		 * @ngdoc method
		 * @name getCity
		 * @methodOf app.list.places.PlaceList
		 * @description 
		 * Returns the name of the city where this places are in.
		 * Using data from the first place.
		 * If not present return a default value (currently only in german).
		 * 
		 * @returns {string} city - Name of the current city.
		 */
		this.getCity = function() {
		    var city = "Lokale"; // default result
			if(this.data) { // data is defined
				for (var i = 0, len = this.data.length; i < len; i++) { // loop
					if (this.data[i].verbose.city) { // found data
						city = this.data[i].verbose.city; // take the city value of this place
						break; // exit loop
					}
				}
			}
			return city;
		};

		/**
		 * Call constructor. 
		 */
		this.initialize(country, city);
	};
	return (PlaceList);
}]);
