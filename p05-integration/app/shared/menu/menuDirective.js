/**
 * @ngdoc directive
 * @name app.directive:menu-rember
 * @scope
 * @description
 * Mark a link for remembering, so if one route to a component
 * he is routed to the last remembered page.
 * E.g. in the list component if you in the Leipzig list and click
 * in the menu on "Alle Lokale" he will be routed back the Leipzig.
 *
 * @example
<a href="#/local/germany" menu-remember="list">Remember this link</a>
 */
ngApp.directive("menuRemember", ["menuService", function(menuService) {
	return {
		restrict: "A", // match only <ANY menu-remember="sectionname"></ANY>
		link: function(scope, element, attrs) { // on linking-time
			element.bind('click', function() { // bind onClick event
				menuService.remember(attrs.href, attrs.menuRemember); // call remember-method of menuService with the section
			});
		}
	};
}]); 

/**
 * @ngdoc directive
 * @name app.directive:menu-replay
 * @restrict A
 * @description
 * Mark a link for replaying, so if this link is clicked during routing
 * it will be checked if there is a history for this section.
 * E.g. in the list component if you in the Leipzig list and click
 * in the menu on "Alle Lokale" he will be routed back the Leipzig.
 *
 * @example
<a href="#/local" menu-replay="list">Route me to #/local/germany because of this both directives</a>
 */
ngApp.directive("menuReplay", ["menuService", function(menuService) {
	return {
		restrict: "A", // match only <ANY menu-replay="sectionname"></ANY>
		compile : function(tElm, tAttrs) { // on compile-time
			return function(scope, elm) {
				elm.bind('click', function() { // bind onClick event
					menuService.replay(tAttrs.menuReplay); // call replay-method of menuService with the section
				});
			};
		}
	};
}]); 


/**
 * @ngdoc directive
 * @name app.directive:menu-toggle
 * @restrict A
 * @description
 * Toggles the menu (show/hide).
 * It's a jqm panel with the id #menu.
 * @see app.menu.menuService.toggle
 *
 * @example
<button menu-toggle>Menü</button>
 */
ngApp.directive("menuToggle", ["menuService", function(menuService) {
	return {
		restrict: "A", // match only <ANY menu-toggle></ANY>
		compile : function(tElm, tAttrs) { // on compile-time
			return function(scope, elm) {
				elm.bind('click', function() { // bind onClick event
					menuService.toggle(); // toggle the menu
				});
			};
		}
	};
}]); 


/**
 * @ngdoc directive
 * @name app.directive:menu-list-toggle
 * @restrict A
 * @description
 * Adds to any <a> element that exists as child the function to toggle the menu.
 *
 * @example
<ul menu-list-toggle>
	<li><a href="#/new">Neue Orte</a></li>
	<li><a href="#/local">Alle Orte</a></li>
</ul>
 */
ngApp.directive("menuListToggle", ["menuService", function(menuService) {
	return {
		compile : function(element) {
			element.removeAttr('menu-list-toggle'); // necessary to avoid infinite compile loop
			element.on('click', 'a', function() { // bind onClick event for all <a> elements as child
					menuService.toggle(); // toggle the menu
			});
			
		}
	};
}]); 
