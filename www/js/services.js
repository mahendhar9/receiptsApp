angular.module('receiptsApp')
.service('firebaseService', function($firebaseArray) {
  var firebaseService = this;

  firebaseService.rootRef = new Firebase("https://receiptsApp.firebaseio.com/");
  firebaseService.receiptsRef = firebaseService.rootRef.child("receipts");

  firebaseService.receipts = $firebaseArray(firebaseService.receiptsRef);

  var imageRef = firebaseService.rootRef.child('images');
  firebaseService.images = $firebaseArray(imageRef);

})