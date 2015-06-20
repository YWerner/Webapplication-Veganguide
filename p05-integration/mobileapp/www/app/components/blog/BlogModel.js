/**
 * @ngdoc service
 * @name app.blog.BlogModel
 * @description
 * Data model for Blog page
 * 
 * @param {string} Service name
 * @param {string} ApiService
 * @param {fn} Factory function with any parameter defined so far
 * @returns {object} New 
 */
angular.module('mvg.blog').factory('Blog', ['ApiService', function(ApiService) {

	/**
	 * @ngdoc function
	 * @name New
	 * @methodOf app.blog.BlogModel
	 * @description
	 * Factory to create a Blog model.
	 * Creates the object and load the data using the API.
	 *
	 * @returns {object} New
	 */
	var Blog = function() {

	    /**
		 * @ngdoc property
		 * @name comments
         * @type array
		 * @methodOf app.blog.BlogModel
		 * @description
		 * Array of comment json's.
		 */
	    this.comments = {};
         
		/**
		 * @ngdoc method
		 * @name initialize
		 * @methodOf app.blog.BlogModel
		 * @description
		 * Constructor. 
		 * Use load() to fetch the new places.
		 */
		this.initialize = function() {
			this.load();
		};

	    /**
		 * @ngdoc method
		 * @name getComments
		 * @methodOf app.blog.BlogModel
		 * @description
		 * Load, if not already happend, the comments of a blog entry.
		 *
         * @param {string} identifier - Id of the blog entry
		 */
		this.getComments = function (identifier) {
		    if (!this.comments[identifier] && this.data) { // comments not already loaded but data
		        var self = this; // to reach 'this' in the callback
		        ApiService.getBlogComments(identifier, function (response) { // get data using api
		            self.comments[identifier] = {};
		            angular.extend(self.comments[identifier], response); // inject data back
		        });
		    }
		};

		/**
		 * @ngdoc method
		 * @name load
		 * @methodOf app.blog.BlogModel
		 * @description
		 * Load the new place list using the API.
		 * Extends the object so that the data is in New.data
		 */
		this.load = function() {
			var self = this; // to reach 'this' in the callback
			ApiService.getBlogEntries(function (response) { // get data using api
				angular.extend(self, response); // inject data back
			});	
		};

		/**
		 * Call constructor. 
		 */
		this.initialize();
	};
	return (Blog);
}]);
