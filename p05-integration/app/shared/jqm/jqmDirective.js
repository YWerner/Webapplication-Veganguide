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

ngApp.directive('listView', function () {
	var link=function(scope, element, attrs) {
		$(element).listview();
		scope.$watchCollection(attrs.watch, function() {
			$(element).listview({
				autodividers: true,
				autodividersSelector: function (elt) {
					// look for the text in the given element
					var text = $.trim( elt.text() ) || null;
					if ( !text ) {
						return null;
					}
					// create the text for the divider (first uppercased letter)
					text = text.slice( 0, 1 ).toUpperCase();
					return text;
				}
			}).listview("refresh");
    	});
	};
	return {
		restrict: 'A',
		scope:false,
		link: link
	};
});

/**
 * JQuery Mobile config 
 */
$.mobile.linkBindingEnabled = false; // deactivate auto link  binding
$.mobile.hashListeningEnabled = false; // deative hash listening
