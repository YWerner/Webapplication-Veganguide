/**
 * @ngdoc service
 * @name app.menu.menuService
 * @description
 * Service for making the menu panel working.
 * 
 * @param {string} Service name
 * @returns {object} menuService 
 */
ngApp.factory('menuService', ['$location', function($location) {

	/**
	 * @ngdoc property
	 * @name history
	 * @type {array}
	 * @private
	 * @propertyOf app.menu.menuService
	 * @see remember
	 * @description
	 * History of the last URL visited in the app as object.
	 * A property for each own declared section. 
	 */
	var history = {_default: ""};

	/**
	 * @ngdoc property
	 * @name section
	 * @type {string}
	 * @private
	 * @propertyOf app.menu.menuService
	 * @see app.directive:menu-replay
	 * @description
	 * Section to replay/redirect on the next route change.
	 */
	var replaySection;

	/**
	 * Factory to create the menuService. 
	 */
	return {

		/**
		 * @ngdoc method
		 * @name toggle
		 * @methodOf app.menu.menuService
		 * @public
		 * @description
		 * Show/hides the menu panel. 
		 */
		toggle: function() {
			$("#menu").panel("toggle");
		},

		/**
		 * @ngdoc method
		 * @name remember
		 * @methodOf app.menu.menuService
		 * @public
		 * @description
		 * Remember the current URL
		 * 
		 * @param {string} section - Self declared section in wich this entry is in scope for remembering.  
		 */
		remember: function(url, section) {
			console.log("MENU: remember: section = " + section + ", path = " + url);
			if(!section) section = "_default"; // if non section is given, use default
			history[section] = url; // store the url for this section
		},

		/**
		 * @ngdoc method
		 * @name replay
		 * @methodOf app.menu.menuService
		 * @public
		 * @description
		 * Replay this section and reroute the user.
		 * 
		 * @param {string} section - Self declared section in wich this entry is in scope for remembering.  
		 */
		replay: function(section) {
			console.log("MENU: replay: section = " + section);
			if(!section) section = "_default"; // if non section is given, use default
			replaySection = section;
		},

		/**
		 * @ngdoc method
		 * @name route
		 * @public
		 * @description
		 * May redirect to the user to a page stored in the menu history.
		 * If not given it will do nothing. 
		 */
		route: function(event) {
			console.log("MENU: route: called");
			if(replaySection && typeof replaySection !== 'undefined') { // a remember/route section is given by the replay method
				var section = replaySection; // internal var
				console.log("MENU: route: replay section = " + section);
				if(history[section]) { // there is a history for this section
					console.log("MENU: route: redirect to history of this section = " + history[section]);
					replaySection = ""; // delete section, so replay is finished and only activated with another menu-replay directive call
					event.preventDefault(); // prevent default routing
					var url = history[section].slice(1); // delete # hash-sign
					$location.path(url); // route the user in this direction
				}
			} else {
				console.log("MENU: route: do not change route.");
				return false;
			}
		}

	};

}]);
