/**
 * @ngdoc service
 * @name app.api.apiService
 * @description
 * Service for communication with the API.
 * 
 * @example apiService.listCountries(function(response) { var countries = response.data });	
 * @param {string} Service name
 * @param {object} $http - angulars $http service
 * @param {object} $localStorage - interface to the local storage
 * @param {object} $filter - angulars $filter service
 */
ngApp.factory('apiService', ['$http', '$localStorage', '$filter', function($http, $localStorage, $filter) {

	/**
	 * @ngdoc var
	 * @name expirationTime
	 * @type {object}
	 * @private
	 * @propertyOf app.menu.apiService
	 * @description
	 * 
	 * Expiration  time in seconds for each API function. 
	 */
	var expirationTime = {
		listCountries: 600,
		listCities: 600,
		listPlacesByCity: 600,
	};

	/** 
	 * @ngdoc function
	 * @name get
	 * @methodOf app.menu.apiService
	 * @private
	 * @description
	 * If url in localStorage and not expired return this data,
	 * else get data using $http request.
	 *
	 * @param {string} url - URL to get/cache/load
	 * @param {string} fn - Name of the API function, used to identify the used cache
	 * @param {function} callback - Callback function, gets called with the loaded data
	 * @param {function} cachefunc - Function which is called with the loaded data to give the option to the edit the data before caching
	 */
	var get = function(url, fn, callback, cachefunc) {
		// pre-processing
		var now = new Date(); // current date and time
		// log
		console.log("API: " + fn + ": Called (ExpirationTime = " + expirationTime[fn] + " seconds.)");
		if($localStorage[url] && $localStorage[url].loadTime) console.log("API: " + fn + ": Last load on " + $localStorage[url].loadTime + ". This is " + ((now - Date.parse($localStorage[url].loadTime)) / 1000) + " seconds ago.");
		// cached empty/invalid/expired
		if(!$localStorage[url] // not cached before
			|| !$localStorage[url].loadTime // or: loadTime invalid
			||  (now - Date.parse($localStorage[url].loadTime)) / 1000 > expirationTime[fn]) { // or: cache expired because: now - loadTime > expirationTime
			console.log("API: " + fn + ": Cache expired or invalid. Try to load new data using the Backend.");
			// get using $http, execute a function
			$http.get(url).success(function(data, status) {
				console.log("API: " + fn + ": Backend call successfuly. Updated cache on: " + now);
				data.loadTime = now; // now loaded
				if(cachefunc !== undefined) { // cachefunc given
					console.log("API: " + fn + ": cachefunc is given, so maniuplate received data before caching.");
					data = cachefunc(data); // call cachefunc and overwrite data with its result
				}
				$localStorage[url] = data; // store to localStorage
				callback($localStorage[url]); // execute callback with data from cache and cache time
			// failed to get data
			}).error(function(data, status) {
				console.log("API: " + fn + ": Backend call failed.");
				if(!$localStorage[url]) { // nothing set
					console.log("API: " + fn + ": Fallback to empty data.");
					$localStorage[url] = { // fallback
							data: {}, // no data
							loadTime: undefined, // undefined load time
							status: status // error status
					};
				}  else {
					console.log("API: " + fn + ": Fallback to old data from load: " + $localStorage[url].loadTime);
				}// else: use old data
				callback($localStorage[url]); // execute callback with fallback data from cache
			});
		// cached and is up to date
		} else {
			console.log("API: " + fn + ": Cache is valid and up to date.");
			callback($localStorage[url]); // execute callback with data from cache and cache time
		}		
	};

	/** 
	 * @ngdoc function
	 * @name safe
	 * @methodOf app.api.apiService
	 * @private
	 * @description
	 * Decode the string into a safe placeholder.
	 * If it contains unsafe characters an empty string will be returned.
	 *
	 * @param {string} placeholder - A maybe unsafe placeholder used in an $http Request
	 * @returns {string} Safe Placeholder
	 */
	var safe = function(placeholder) {
		var reg = /^[a-zA-Z0-9\-_]+$/;
		if(reg.test) {
			return placeholder;
		} else {
			return "";
		}
	};

	return {

		/** 
		 * @ngdoc property
		 * @name url
		 * @type {string}
		 * @propertyOf app.list.api.apiService
		 * @description
		 * URL to the API
		 */
		url: 'api/',

		/** 
		 * @ngdoc property
		 * @name apikey
		 * @type {string}
		 * @propertyOf app.list.api.apiService
		 * @description
		 * API-key wich should be used to communicated with the API.
		 */
		apikey: '',

		/** 
		 * @ngdoc property
		 * @name lang
		 * @type {string}
		 * @propertyOf app.list.api.apiService
		 * @description
		 * Language wich should be returned by the API.
		 */
		lang: 'de',

		/** 
		 * @ngdoc method
		 * @name listCountries
		 * @methodOf app.api.apiService
		 * @description
		 * Executes a callback with a list of all countries as parameter
		 *
		 * @see {@link http://veganguide.org/api|vg.browse.listCountries}
		 * @param {fn} callback - Function to execute
		 */
		listCountries: function(callback) {
			//get('api/JSON_Dummies/Countries.json', 'listCountries', callback);
			get(
				this.url + 'veganguide/local/' + safe(this.lang), // url to the api call
				'listCountries', // api function name
				callback, // callback which gets called with data
				function(data) { // function to maniuplate data before caching
					data.data = $filter('unique')(data.data, 'name'); // discarded duplicate entries by name
					data.data = $filter('noFaulty')(data.data, 'name'); // discard entries beginning with a '!'
					return data;
				}
			);
		},

		/** 
		 * @ngdoc method
		 * @name listCities
		 * @methodOf app.api.apiService
		 * @description
		 * Executes a callback with a list of all cities as parameter
		 *
		 * @see {@link http://veganguide.org/api|vg.browse.listCities}
		 * @param {string} country - Cities should be in this country
		 * @param {fn} callback - Function to execute
		 */
		listCities: function(country, callback) {
			//get('api/JSON_Dummies/Cities_Germany.json', 'listCities', callback);
			get(
				this.url + 'veganguide/local/' + safe(this.lang) + '/country/' + safe(country), // url to the api call
				'listCities', // api function name
				callback, // callback which gets called with data
				function(data) { // function to maniuplate data before caching
					data.data = $filter('unique')(data.data, 'name'); // discarded duplicate entries by name
					data.data = $filter('noFaulty')(data.data, 'name'); // discard entries beginning with a '!'
					return data;
				}
			);
		},

		/** 
		 * @ngdoc method
		 * @name listPlacesByCity
		 * @methodOf app.api.apiService
		 * @description
		 * Executes a callback with a list of all places as parameter
		 *
		 * @see {@link http://veganguide.org/api|vg.browse.listCities}
		 * @param {string} country - Cities should be in this country
		 * @param {string} city - Cities should be in this city
		 * @param {fn} callback - Function to execute
		 */
		listPlacesByCity: function(country, city, callback) {
			//get('api/JSON_Dummies/Lokale_Leipzig.json', 'listPlacesByCity',  callback);
			get(
				this.url + 'veganguide/local/' + safe(this.lang) + '/country/' + safe(country) + '/city/' + safe(city), // url to the api call
				'listPlacesByCity',  // api function name
				callback, // callback which gets called with data
				function(data) { // function to maniuplate data before caching
					data.data = $filter('unique')(data.data, 'name'); // discarded duplicate entries by name
					data.data = $filter('noFaulty')(data.data, 'name'); // discard entries beginning with a '!'
					return data;
				}
			);
		}
	};
}]);
