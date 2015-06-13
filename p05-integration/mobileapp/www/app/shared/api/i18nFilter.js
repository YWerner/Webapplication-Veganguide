/**
 * @ngdoc filter
 * @name app.api.i18n
 * @description
 * Filter to translate i18n wildcards from the veganguide API into real text.
 * 
 * @param {string} rawstr - i18n string
 * @returns {string} translated string
 */
angular.module('mvg.api').filter('i18n', function () {

	/**
	 * @ngdoc var
	 * @varOf app.api.i18n
	 * @name mapping
	 * @type {object}
	 * @private
	 * @description
	 * Mapping von Wildcard zu richtigem  Text.
	 * Aktuell nur in Deutsch. 
	 */
	var mapping = {
		"%date_monday" : "Montag",
		"%date_tuesday": "Dienstag",
		"%date_wednesday" : "Mittwoch",
		"%date_thursday" : "Donnerstag",
		"%date_friday" : "Freitag",
		"%date_saturday" : "Samstag",
		"%date_sunday" : "Sonntag",
		"%date_till" : "bis"
	};

	return function(input) {
		var str = input;
		angular.forEach(mapping, function(value, key) { // loop any element in the mapping object
			str = str.replace(new RegExp(key, 'g'), value);
		});
      return str;
   };
});