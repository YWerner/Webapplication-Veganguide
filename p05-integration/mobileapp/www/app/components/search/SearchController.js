/**
* @ngdoc controller
* @name app.search.SearchController
* @description
* Controller for the search page.

*/
angular.module('mvg.search', []).controller('SearchController', function ($scope, $rootScope, $stateParams, $ionicSideMenuDelegate, $ionicBackdrop, Search) {

    // Settings and setup
    $scope.lookup = {
        radius: 5, // in km
        input: { formatted_address: "Straße und Ort" }, // default input
        map: true // default use list
    }

    // Create data model
    $scope.search = new Search();
    $scope.search.radius = $scope.lookup.radius;

    /**
     * @ngdoc method
     * @name onMapInitialized
     * @methodOf app.search.SearchController
     * @description
     * Triggers when map is initalized
     */
    $scope.$on('mapInitialized', function (event, map) {
        console.log("Map: Map initialized");
        $scope.map = map; // store in $scope
    });

    /**
     * @ngdoc method
     * @name toggleOptions
     * @methodOf app.search.SearchController
     * @description
     * Toggles the options side menu.
     */
    $scope.toggleOptions = function () {
        $ionicSideMenuDelegate.$getByHandle('search-menu').toggleRight();
    }

    /**
     * @ngdoc method
     * @name centerOnUser
     * @methodOf app.search.SearchController
     * @description
     * Center google maps on user position.
     */
    $scope.centerOnUser = function () {
        console.log("Map: Lookup for user position");
        // loading screen
        $rootScope.$broadcast('loading:show'); // show
        // get user location as coords and as address
        $scope.search.getCurrentPosition(
            function (position) { // success
                $scope.lookup.input = position;
                $rootScope.$broadcast('loading:hide'); // hide load screen after loading
            }, function () { // failed
                $rootScope.$broadcast('loading:hide'); // hide load screen
            }
        );
    };

    /**
    * @ngdoc method
    * @name showInfoWindow
    * @methodOf app.search.SearchController
    * @description
    * Get trigger by a click on a marker.
    * Creates and show an info window to an place.
    *
    * @param {object} event - Event which triggered this method
    * @param {object} place - Place data 
    */
    $scope.showInfoWindow = function (event, place) {
        // create via google maps object an InfoWindow
        var infowindow = new google.maps.InfoWindow();
        var center = new google.maps.LatLng(place.coords.lat, place.coords.lon);
        var content = '<h4>' + place.name + ' (' +  place.distance + ' km)</h4>' +
                      '<a class="button icon-right ion-chevron-right button-balanced" href="#/app/place/' + place.identifier + '">Details</a>';
        infowindow.setContent(content);
        infowindow.setPosition(center);
        infowindow.open($scope.map);
    };

    /**
    * @ngdoc method
    * @name watchLookupInput
    * @methodOf app.search.SearchController
    * @description
    * Get called whenever lookup.input model gets changed.
    * Mostly after centerOnUser or after the user typed an address.
    *
    * @param {object} value - input model
    */
    $scope.$watch('lookup.input', function (value) {  // watch for changes on the data of place
        console.log("Map: Input changed");
        $ionicBackdrop.release(); // WP8 fix, directive doesn't released backdrop
        $scope.search.position = value;
        if ($scope.map) {
            // loading screen
            $rootScope.$broadcast('loading:show'); // show
            // change position
            $scope.search.lookup(function (search) {
                console.log("Map: Lookup");
                var LatLng = new google.maps.LatLng(search.position.geometry.location.G, search.position.geometry.location.K); // old: .A, .F
                $scope.map.setCenter(LatLng); // center map on user position
                google.maps.event.trigger($scope.map, 'resize');
                $rootScope.$broadcast('loading:hide'); // hide load screen after loading
            });
        }
    });

});
