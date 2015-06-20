/**
 * @ngdoc service
 * @name app.new.NewModel
 * @description
 * Data model for "new places" page
 * 
 * @param {string} Service name
 * @param {string} ApiService
 * @param {fn} Factory function with any parameter defined so far
 * @returns {object} New 
 */
angular.module('mvg.new').factory('New', ['ApiService', function(ApiService) {

	/**
	 * @ngdoc function
	 * @name New
	 * @methodOf app.new.New
	 * @description
	 * Factory to create a New model.
	 * Creates the object and load the data using the API.
	 *
	 * @returns {object} New
	 */
	var New = function() {

		/**
		 * @ngdoc method
		 * @name initialize
		 * @methodOf app.new.New
		 * @description
		 * Constructor. 
		 * Use load() to fetch the new places.
		 */
		this.initialize = function() {
			this.load();
		};

		/**
		 * @ngdoc method
		 * @name load
		 * @methodOf app.new.New
		 * @description
		 * Load the new place list using the API.
		 * Extends the object so that the data is in New.data
		 */
		this.load = function() {
			var self = this; // to reach 'this' in the callback
			ApiService.listNewPlaces(function (response) { // get data using api
				angular.extend(self, response); // inject data back
			});	
		};

		/**
		 * Call constructor. 
		 */
		this.initialize();
	};
	return (New);
}]);
