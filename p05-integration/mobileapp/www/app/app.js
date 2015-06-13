angular.module('mvg', ['ionic', 'ngSanitize', 'ngStorage', 'ngOrderObjectBy', 'mvg.api','mvg.general', 'mvg.local', 'mvg.place'])

// run
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
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
})

// config like routes
.config(function ($stateProvider, $urlRouterProvider) {

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
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/local');
});

// AppController
angular.module('mvg.general', []).controller('AppController', function ($scope, $rootScope) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

})