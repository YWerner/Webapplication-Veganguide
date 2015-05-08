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
      $(element).listview("refresh");
    });
  };
  return {
    restrict: 'EA',
    scope:false,
    link: link
  };
});

/**
 * JQuery Mobile config 
 */
$.mobile.linkBindingEnabled = false; // deactivate auto link  binding
$.mobile.hashListeningEnabled = false; // deative hash listening
