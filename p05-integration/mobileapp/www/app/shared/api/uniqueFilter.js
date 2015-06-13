/**
 * Filter to delete duplicates in an array of objects by a key.
 *
 * @class app.filter.uniqueFilter
 * @memberOf app.filter
 * @author Ben Lesh
 * @see {@link http://stackoverflow.com/a/20222966}
 */

angular.module('mvg.api').filter('unique', function () {
   return function(collection, keyname) {
      var output = [], 
          keys = [];

      angular.forEach(collection, function(item) {
          var key = item[keyname];
          if(keys.indexOf(key) === -1) {
              keys.push(key);
              output.push(item);
          }
      });

      return output;
   };
});