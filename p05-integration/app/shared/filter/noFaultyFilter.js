/**
 * Filter to delete entires in an array of objects by a key when they seems to be faulty.
 *
 * @class app.filter.noFaultyFilter
 * @memberOf app.filter
 */

/**
 * Factory to create the filter.
 * 
 * @function filter
 * @memberOf app.filter.noFaultyFilter
 * @param {string} Filter name
 * @param {fn} Filter function
 * @returns {fn} Filter
 */
ngApp.filter('noFaulty', function() {
	return function(collection, keyname) {
		var output = [];
		angular.forEach(collection, function(item) { // loop any element in the input array
			var key = item[keyname]; // get value of the observed key
			if(key.charAt(0) !== "!" && key !== "") { // first char is not a '!' and not empty
				output.push(item); // push to output array
			}
		});
      return output;
   };
});