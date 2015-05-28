/**
 * @ngdoc service
 * @name app.place.Place
 * @description
 * Data model for the place.
 * Works as services.
 * Is created by a self-named factory.
 * 
 * @param {string} Service name
 * @param {string} apiService
 * @param {fn} Factory function with any parameter defined so far
 * @returns {object} PlaceList 
 */
ngApp.factory('Place', ['apiService', function(apiService) {

	/**
	 * @ngdoc function
	 * @name Place
	 * @methodOf app.place.Place
	 * @description
	 * Factory to create a Place.
	 * Creates the object and load the data using the API.
	 *
	 * @param {string} place - Id of the place
	 * @returns {object} Place
	 */
	var Place = function(place) {

		/**
		 * @ngdoc method
		 * @name initialize
		 * @methodOf app.place.Place
		 * @description
		 * Constructor. 
		 * Use load() to fetch the place.
		 *
		 * @param {string} place - Id of the place
		 */
		this.initialize = function(place) {
			this.load(place);
		};

		/**
		 * @ngdoc method
		 * @name load
		 * @methodOf app.place.Place
		 * @description
		 * Load the place using the API.
		 * Extends the object so that the data is in Place.data
		 *
		 * @param {string} place - Id of the place
		 */
		this.load = function(country, city) {
			var self = this; // to reach 'this' in the callback
			apiService.getInfo(place, function(response) { // get data using api
				angular.extend(self, response); // inject data back
				if(response.data.photo) { // image present
					self.getImage(400); // load image too if present
				}
			});
		};

		/**
		 * @ngdoc method
		 * @name getComments
		 * @methodOf app.place.Place
		 * @description
		 * Load, if not already happend, the comments of this place.
		 *
		 * @return {object} place - Id of the place
		 */
		this.getComments = function() {
			if(!this.comments && this.data) { // comments not already loaded but data
				var self = this; // to reach 'this' in the callback
				apiService.getComments(this.data.identifier, function(response) { // get data using api
					self.comments = {};
					angular.extend(self.comments, response); // inject data back
				});
			}
		};

		/**
		 * @ngdoc method
		 * @name getImage
		 * @methodOf app.place.Place
		 * @description
		 * Load, if not already happend, the image of this place.
		 *
		 * @param {int} Requested width of the image
		 * @return {object} place - Id of the place
		 */
		this.getImage = function(width) {
			if(!this.image && this.data) { // image not already loaded but data
				var self = this; // to reach 'this' in the callback
				apiService.getImage(this.data.identifier, width, function(response) { // get data using api
					self.image = {};
					angular.extend(self.image, response); // inject data back
				});
			}
		};

		/**
		 * Call constructor. 
		 */
		this.initialize(place);
	};
	return (Place);
}]);
