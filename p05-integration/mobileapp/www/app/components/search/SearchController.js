/**
* @ngdoc controller
* @name app.search.SearchController
* @description
* Controller for the search page.

*/
angular.module('mvg.search', []).controller('SearchController', function ($scope, $stateParams, $ionicSideMenuDelegate, geolocation, Search) {

    // Settings and setup
    $scope.lookup = {
        radius: 25, // in km
        input: "", // default input
        map: true, // default use list
        coords: {}, // object containing coords
        markers: [] // contain any marker on the map
    }

    // Create data model
    $scope.search = new Search();

    /**
     * @ngdoc method
     * @name doLookup
     * @methodOf app.search.SearchController
     * @description
     * Event which triggers while clicking on the "Los"-button
     * Will start the lookup using the Search model.
     */
    $scope.doLookup = function () { // create method
        // get position as geocoords (longitude, latitude)
        if ($scope.lookup.input == "") { // Empty input location, search by geocoords
            geolocation.getLocation().then(function (pos) {
                $scope.lookup.coords = pos.coords; // store position in $scope
                $scope.search.load( // load by coords
                    pos.coords.longitude,
                    pos.coords.latitude,
                    $scope.lookup.radius,
                    function () {
                        $scope.createMap(); // create map by current search model
                    }
                ); // load data around this coords
            });
        } else { // filled input location, search by this address
            $scope.search.loadByAddress( // load by this address
                $scope.lookup.input,
                $scope.lookup.radius,
                function (self, longitude, latitude, radius) {
                    $scope.lookup.coords = { 'longitude': longitude, 'latitude': latitude }; // store position in $scope
                    $scope.createMap(); // create map by current search model
                }
            );
        }
    }

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
     * @name createMap
     * @methodOf app.search.SearchController
     * @description
     * Creates a map using Google Maps API and the data of the current search model.
     */
    $scope.createMap = function () {
        console.log("Map: Recreate map using createMap()");
        // default options
        $scope.map = { center: { latitude: 51.5167, longitude: 9.9167 }, zoom: 6 }; // germany centered
        $scope.mapOptions = { scrollwheel: false };
        // change location to searched one
        if ($scope.lookup.coords.latitude && $scope.lookup.coords.longitude) {
            console.log("Map: Center map on: Lat = " + $scope.lookup.coords.latitude + " and Long = " + $scope.lookup.coords.longitude);
            $scope.map = { center: { latitude: $scope.lookup.coords.latitude, longitude: $scope.lookup.coords.longitude }, zoom: 12 }; // map: centered: user location
            // create markers
            $scope.lookup.markers = []; // reset
            var newMarker = { // add user position as marker with default color
                id: 'user',
                latitude: $scope.lookup.coords.latitude,
                longitude: $scope.lookup.coords.longitude,
                title: "Ihre Position",
                show: false
            };
            newMarker.onClick = function() {
                console.log("Clicked!");
                newMarker.show = !newMarker.show;
            };
            $scope.lookup.markers.push(newMarker);
            // for each any other found location

        }
    }

});
