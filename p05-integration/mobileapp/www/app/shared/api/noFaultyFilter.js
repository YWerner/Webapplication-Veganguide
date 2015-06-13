
/**
 * @ngdoc filter
 * @name app.api.noFaulty
 * @description
 * Filter to delete entries in an array of objects by a key when they seems to be faulty.
 * 
 * @param {object} collection - data which gets manipulated
 * @param {string} key - only look in this property of any child  object
 */
angular.module('mvg.api').filter('noFaulty', function () {
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