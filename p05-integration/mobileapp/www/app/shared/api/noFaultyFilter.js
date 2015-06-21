
/**
 * @ngdoc filter
 * @name app.api.noFaulty
 * @description
 * Filter to delete entries in an array of objects by a key when they seems to be faulty.
 * Also parse input from HTML (the entities).
 * And also strip slashes.
 * 
 * @param {object} collection - data which gets manipulated
 * @param {string} key - only look in this property of any child  object
 */
angular.module('mvg.api').filter('noFaulty', function ($sce) {
	return function(collection, keyname) {
		var output = [];
		angular.forEach(collection, function(item) { // loop any element in the input array
			var key = item[keyname]; // get value of the observed key
			if (key.charAt(0) !== "!" && key !== "") { // first char is not a '!' and not empty
			    item[keyname] = angular.element('<textarea />').html(item[keyname]).text(); // make sure html entitites are decoded
			    item[keyname] = item[keyname].replace(new RegExp("\\\\", "g"), "");
				output.push(item); // push to output array
			}
		});
      return output;
   };
});