/**
 * @ngdoc service
 * @name app.search.Search
 * @description
 * Data model for the search.
 * Works as services.
 * Is created by a self-named factory.
 * 
 * @param {string} Service name
 * @param {string} ApiService
 * @param {fn} Factory function with any parameter defined so far
 * @returns {object} Search 
 */
angular.module('mvg.search').factory('Search', ['ApiService', 'geolocation', '$ionicPopup', '$http', function (ApiService, geolocation, $ionicPopup, $http) {

    /**
	 * @ngdoc function
	 * @name Place
	 * @methodOf app.place.Search
	 * @description
	 * Factory to create a Place.
	 * Creates the object and load the data using the API.
	 *
	 * @param {string} place - Id of the place
	 * @returns {object} Place
	 */
    var Search = function () {

        /**
		 * @ngdoc property
		 * @name position
         * @property
		 * @propertyOf app.place.Search
		 * @description
		 * Contains the current position of the user as geo coords (lat and long) and address.
         * Also contains a status boolean if process of getting user position failed.
		 *
		 */
        this.position = {
            latitude: null, // Latitude
            longitude: null, // Longitude
            address: null, // Full readable address
            LatLng: null, // LatLng Google Maps API object
            location: null, 
            status: true, // status of process getting the user location
        }

        /**
		 * @ngdoc method
		 * @name initialize
		 * @methodOf app.place.Search
		 * @description
		 * Constructor. 
		 *
		 */
        this.initialize = function () {
        };

        /**
        * @ngdoc method
        * @name load
        * @methodOf app.search.Search
        * @description
        * Will call the API with the coords and get places near of that.
        *
        * @param {int} latitude - Latitude
        * @param {int} longitude - Longitude
        * @param {int} radius - Radius in km
        * @param {fn} callback - Callback get called after loading data
        */
        this.load = function (latitude, longitude, radius, callback) {
            var self = this; // to reach 'this' in the callback
            ApiService.searchByCoords(longitude, latitude, radius, function (response) { // get data using api
                angular.extend(self, response); // inject data back
                callback(self, longitude, latitude, radius);
            });
        };

        /**
        * @ngdoc method
        * @name getCurrentPosition
        * @methodOf app.search.Search
        * @description
        * Load geocoords and address of the user and store it to the model.
        * In success case the callback will be called, in error case the error_callback.
        * As parameter both callacks get this object.
        *
        * @param {fn} callback - Callback get called in success case
        * @param {fn} error_callback - Error callback get called in error case
        */
        this.getCurrentPosition = function (callback, error_callback) {
            var self = this; // to reach this in the callbacks
            // load user location as coords using the browser
            navigator.geolocation.getCurrentPosition(function (position) { // got position
                // store to this object
                self.position.status = true;
                // store geo coords
                self.position.latitude = position.coords.latitude;
                self.position.longitude = position.coords.longitude;
                // store a Google API LatLng object
                self.position.LatLng = new google.maps.LatLng(self.position.latitude, self.position.longitude);
                // load address by geo coords using Google API
                geocoder = new google.maps.Geocoder();
                geocoder.geocode({ 'latLng': self.position.LatLng }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK && results[0].formatted_address) {
                        // store location object and readable address
                        self.position.location = results[0];
                        self.position.address = results[0].formatted_address;
                        // now run callback
                        callback(self); // handing over this object
                    } else {
                        self.position.status = false; // error
                        error_callback(self); // run error_callback handing over this object
                    }
                });
            }, function (error) { // error
                self.position.status = false; // error
                error_callback(self); // run error_callback handing over this object
            });
        };

        /**
		 * Call constructor. 
		 */
        this.initialize();
    };
    return (Search);
}]);
