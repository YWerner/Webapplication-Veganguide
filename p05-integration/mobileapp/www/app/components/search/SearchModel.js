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
	 * @methodOf app.place.Place
	 * @description
	 * Factory to create a Place.
	 * Creates the object and load the data using the API.
	 *
	 * @param {string} place - Id of the place
	 * @returns {object} Place
	 */
    var Search = function () {

        /**
		 * @ngdoc method
		 * @name initialize
		 * @methodOf app.place.Place
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
        * @param {int} longitude - Longitude
        * @param {int} latitude - Latitude
        * @param {int} radius - Radius in km
        * @param {fn} callback - Callback get called after loading data
        */
        this.load = function (longitude, latitude, radius, callback) {
            var self = this; // to reach 'this' in the callback
            ApiService.searchByCoords(longitude, latitude, radius, function (response) { // get data using api
                angular.extend(self, response); // inject data back
                callback(self, longitude, latitude, radius);
            });
        };

        /**
        * @ngdoc method
        * @name loadByAddress
        * @methodOf app.search.Search
        * @description
        * Translate a address into geocoords using the Google API and then load using load methode.
        *
        * @param {string} address - Address
        * @param {int} radius - Radius in km
        * @param {fn} callback - Callback get called after loading data
        */
        this.loadByAddress = function (address, radius, callback) {
            var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address;
            var self = this; // to reach 'this' in the callback
            $http.get(url).success(function (data, status) {
                self.load(
                    data.results[0].geometry.location.lng,
                    data.results[0].geometry.location.lat,
                    radius,
                    callback
                );
            }).error(function (data, status) {
                $ionicPopup.alert({
                    title: 'Fehler',
                    template: 'Adresse nicht gefunden!'
                });
            });
        };

        /**
		 * Call constructor. 
		 */
        this.initialize();
    };
    return (Search);
}]);
