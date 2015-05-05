/**
 * JQuery Mobile directive 
 */
ngApp.directive('jqm', function($timeout) {
  return {
    link: function(scope, elm, attr) {
        $timeout(function(){
            elm.trigger('create');
        }, 100);
    }
  };
});

/**
 * JQuery Mobile config 
 */
$.mobile.linkBindingEnabled = false; // deactivate auto link  binding
$.mobile.hashListeningEnabled = false; // deative hash listening
