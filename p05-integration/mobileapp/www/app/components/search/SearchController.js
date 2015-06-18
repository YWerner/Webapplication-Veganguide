/**
* @ngdoc controller
* @name app.search.SearchController
* @description
* Controller for the search page.

*/
angular.module('mvg.search', []).controller('SearchController', function ($scope, $rootScope, $stateParams, $ionicSideMenuDelegate, $ionicLoading, geolocation, Search) {

    // Settings and setup
    $scope.lookup = {
        radius: 25, // in km
        input: { formatted_address: "Straße und Ort" }, // default input
        map: true, // default use list
        mapInitalized: false,
        marker: [] // array of marker on the map
    }

    // Create data model
    $scope.search = new Search();

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
        $scope.lookup.mapInitalized = true;
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
            function () { // success
                $scope.map.setCenter($scope.search.position.LatLng); // center map on user position
                $scope.lookup.input = $scope.search.position.location; // store address as input of the search field (ToDo: currently just the label value got changed)
                $scope.doLookup(function () { // load restaurants near the user
                    $rootScope.$broadcast('loading:hide'); // hide load screen after loading
                });
            }, function () { // failed
                $rootScope.$broadcast('loading:hide'); // hide load screen
            }
        );
    };

    /**
    * @ngdoc method
    * @name doLookup
    * @methodOf app.search.SearchController
    * @description
    * Get trigger by change of the search input field, or gets called by the self-localization of an user.
    *
    * @param {fn} callback - Callback function
    */
    $scope.doLookup = function (callback) {
        console.log($scope.lookup.input);
        console.log($scope.lookup.input.geometry.location.A);
        console.log($scope.lookup.input.geometry.location.F);
        $scope.search.load( // load restaurants around coords
            $scope.lookup.input.geometry.location.A,
            $scope.lookup.input.geometry.location.F,
            //$scope.search.position.longitude,
            //$scope.search.position.latitude,
            $scope.lookup.radius,
            function (search) { // call back
                console.log($scope.search);
                callback();
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
        var content = '<h4>' + place.name + '</h4>' +
                      '<a class="button icon-right ion-chevron-right button-balanced" href="#/app/place/' + place.identifier + '">' + place.distance + ' km, Details</a>';
        infowindow.setContent(content);
        infowindow.setPosition(center);
        infowindow.open($scope.map);
    };

    $scope.$watch('lookup.input', function (value) {  // watch for changes on the data of place
        console.log("Map: Input changed to: " + value);
        if ($scope.lookup.mapInitalized) {
            console.log("Map: Lookup for address");
            // loading screen
            $rootScope.$broadcast('loading:show'); // show
            // get user location as coords and as address
            $scope.search.getCurrentPosition(
                function () { // success
                    $scope.doLookup(function () { // load restaurants near the user
                        $rootScope.$broadcast('loading:hide'); // hide load screen after loading
                    });
                }, function () { // failed
                    $rootScope.$broadcast('loading:hide'); // hide load screen
                }
            );
        }
    });

    $scope.$watch('lookup.map', function (value) {  // watch for changes to show/hide map
        console.log("Map: Switch map to = " + value);
        if (value) {
            console.log("Map: Redraw");
            //google.maps.event.trigger($scope.map, 'resize');
        }
    });

});
