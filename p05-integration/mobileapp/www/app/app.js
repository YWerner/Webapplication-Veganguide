angular.module('mvg', [
                'ionic',
                'ngSanitize',
                'ngStorage',
                'ngOrderObjectBy',
                'ngMap',
                'ion-google-place',
                'geolocation',
                'mvg.api',
                'mvg.general',
                'mvg.local',
                'mvg.place',
                'mvg.search',
                'mvg.new'
            ])

// run
    .run(function ($ionicPlatform, $rootScope, $ionicLoading) {
        // Ionic hybrid app stuff
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
        // loading indicator while $http request
        $rootScope.$on('loading:show', function () {
            $ionicLoading.show({
                template: '<ion-spinner></ion-spinner>',
                noBackdrop: true
            })
        })
        $rootScope.$on('loading:hide', function () {
            $ionicLoading.hide()
        })
    })

// config like routes
    .config(function ($stateProvider, $urlRouterProvider, $httpProvider) { // , uiGmapGoogleMapApiProvider

        // routes
        $stateProvider

            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "app/shared/menu/menuView.html",
                controller: 'AppController'
            })
            .state('app.local', {
                url: "/local",
                views: {
                    'menuContent': {
                        templateUrl: "app/components/local/countries/LocalCountriesView.html",
                        controller: 'LocalCountriesController'
                    }
                }
            })
            .state('app.cities', {
                url: "/local/:country",
                views: {
                    'menuContent': {
                        templateUrl: "app/components/local/cities/LocalCitiesView.html",
                        controller: 'LocalCitiesController'
                    }
                }
            })
            .state('app.places', {
                url: "/local/:country/:city",
                views: {
                    'menuContent': {
                        templateUrl: "app/components/local/places/LocalPlacesView.html",
                        controller: 'LocalPlacesController'
                    }
                }
            })
            .state('app.place', {
                url: "/place/:place",
                views: {
                    'menuContent': {
                        templateUrl: "app/components/place/PlaceView.html",
                        controller: 'PlaceController'
                    }
                }
            }).state('app.search', {
                url: "/search",
                views: {
                    'menuContent': {
                        templateUrl: "app/components/search/SearchView.html",
                        controller: 'SearchController'
                    }
                }
            }).state('app.new', {
                url: "/new",
                views: {
                    'menuContent': {
                        templateUrl: "app/components/new/NewView.html",
                        controller: 'NewController'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/local');

        // loading indicator while $http request
        $httpProvider.interceptors.push(function ($rootScope) {
            return {
                request: function (config) {
                    $rootScope.$broadcast('loading:show')
                    return config
                },
                response: function (response) {
                    $rootScope.$broadcast('loading:hide')
                    return response
                }
            }
        })

    });

// AppController
angular.module('mvg.general', []).controller('AppController', function ($scope, $rootScope, $localStorage) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});
    $scope.clearCache = function () {
        $localStorage.$reset();
        console.log("Cache cleared");
    }

})