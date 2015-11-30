// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('receiptsApp', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('receipts', {
    url: '/receipts',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'MainCtrl',
    controllerAs: 'mainCtrl'
  })

  .state('receipts.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('receipts.new', {
      url: '/new',
      views: {
        'menuContent': {
          templateUrl: 'templates/new.html',
          controller: 'NewReceiptCtrl',
          controllerAs: 'newReceiptCtrl'
        }
      }
    })
    .state('receipts.all', {
      url: '/all',
      views: {
        'menuContent': {
          templateUrl: 'templates/receipts.html',
          controller: 'ReceiptsCtrl',
          controllerAs: 'receiptsCtrl'
        }
      }
    })

  .state('receipts.single', {
    url: '/:receiptId',
    views: {
      'menuContent': {
        templateUrl: 'templates/receipt.html',
        controller: 'ReceiptCtrl',
        controllerAs: 'receiptCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/receipts/all');
});
