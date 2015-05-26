/**
 * JQuery Mobile directive 
 */
ngApp.directive('jqm', function($timeout) {
  return {
    link: function(scope, elm, attr) {
        $timeout(function(){
            elm.trigger('create');
        }, 0);
    }
  };
});

/**
 * Directive for refreshing a Listview after finishing a ng-repeat
 * Based on the code of Ben Nadel
 * 
 * @returns DOM compilation
 * @example <li ng-repeat="country in countryList.data" refresh-list>
 * @see {@link http://www.bennadel.com/blog/2592-hooking-into-the-complete-event-of-an-ngrepeat-loop-in-angularjs.htm|Ben Nadel} 
 */
ngApp.directive(
	"refreshList",
	function( $rootScope ) {
		var uuid = 0;
		function compile( tElement, tAttributes ) {
			var id = ++uuid;
			tElement.attr( "repeat-complete-id", id );
			tElement.removeAttr( "repeat-complete" );
			var parent = tElement.parent();
			var parentScope = ( parent.scope() || $rootScope );
			var unbindWatcher = parentScope.$watch(
				function() {
					var lastItem = parent.children( "*[ repeat-complete-id = '" + id + "' ]:last" );
					if ( ! lastItem.length ) {
						return;
					}
					var itemScope = lastItem.scope();
					if ( itemScope.$last ) {
						unbindWatcher();
						parent.listview().listview("refresh");
					}
				}
			);
		}
		return({
			compile: compile,
			priority: 1001,
			restrict: "A"
		});
	}
);

/**
 * @ngdoc directive
 * @name app.directive:listview-refresh
 * @restrict A
 * @description
 * Refresh the complete jqm listview.
 * Used in combination with ng-if for checking if data model changed
 * and ng-bind in underlaying li elements.
 *
 * @example
<ul ng-if="data" listview-refresh>
	<li ng-bind="data.a"></li>
	<li ng-bind="data.b"></li>
</ul>
 */
ngApp.directive("listviewRefresh", [function() {
	return {
		compile : function(element) {
			element.removeAttr('listview-refresh'); // necessary to avoid infinite compile loop
			element.listview().listview("refresh");	
		}
	};
}]); 

/**
 * JQuery Mobile config 
 */
$.mobile.linkBindingEnabled = false; // deactivate auto link  binding
$.mobile.hashListeningEnabled = false; // deative hash listening
