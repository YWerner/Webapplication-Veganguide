/* Custom JS for the mobile vegan guide app */

/**
 * Page: all
 * Event: on mobileinit 
 */
$(document).bind("mobileinit", function(){

	/**
	 * Settings for all pages 
	 */
	$.mobile.defaultPageTransition = "slide"; /* set default transition: slide */

	/*
	 * Page: place
	 * Event: onClick Comments-Expand button
	 */
	$(document).on('vclick', '#place #buttonComments', function(){ 
		/* state of commment list: collapsed? */
		var isCollapsed = $( "#place #comments" ).collapsible( "option", "collapsed" );
		if(isCollapsed) { // is collapsed
	    	$( "#place #comments" ).collapsible( "expand" ); // expand list
	    	$( "#place #buttonComments").buttonMarkup({ icon: "minus" }); // show minus as icon in button
	  } else { // is expanded
	  		$( "#place #comments" ).collapsible( "collapse" ); // collapse list
	  		$( "#place #buttonComments").buttonMarkup({ icon: "plus" }); // show plus as icon in button
	  	}
	});

});
