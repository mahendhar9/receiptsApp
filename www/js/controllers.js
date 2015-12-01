angular.module('receiptsApp')
.controller('MainCtrl', function(firebaseService) {
  var mainCtrl = this;

  mainCtrl.logout = function() {
    return firebaseService.logout();
  }

  mainCtrl.currentUser = function() {
    return firebaseService.currentUser;
  }

})

.controller('ReceiptsCtrl', function($scope, firebaseService) {
  var receiptsCtrl = this;
  receiptsCtrl.receipts = firebaseService.receipts;
  receiptsCtrl.images = firebaseService.images;

  receiptsCtrl.orderReceipts = function(dateString) {
    console.log(dateString);
  }

  receiptsCtrl.currentUser = function() {
    return firebaseService.currentUser;
  }
  

  receiptsCtrl.getDate = function(dateString) {
    console.log(dateString);
    var date = new Date(dateString);
    var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];

    return monthNames[date.getMonth()] + ' '  + date.getDate() + ', ' + date.getFullYear();
  };

})

.controller('ReceiptCtrl', function() {
  var receiptCtrl = this;

})

.controller('NewReceiptCtrl', function($scope, firebaseService, $firebaseObject, $firebaseArray, $state) {
  var newReceiptCtrl = this;
  newReceiptCtrl.date = new Date();
  newReceiptCtrl.receipts = firebaseService.receipts;

  newReceiptCtrl.currentUser = function() {
    return firebaseService.currentUser;
  }
  newReceiptCtrl.shopTypes = [
  {type: 'Restaurant'},
  {type: 'Shopping'},
  {type: 'Movies'},
  {type: 'Travel'},
  {type: 'Medical'},
  {type: 'Other'}
  ];
  
  var disabledDates = [
  new Date(1437719836326),
    new Date(2015, 7, 10), //months are 0-based, this is August, 10th!
    new Date('Wednesday, August 12, 2015'), //Works with any valid Date formats like long format
    new Date("08-14-2015"), //Short format
    new Date(1439676000000), //UNIX format
    new Date(),
    new Date(2015, 10, 8)
    ];
    var monthList = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    $scope.datepickerObject = {};
    $scope.datepickerObject.inputDate = new Date();

    $scope.datepickerObjectPopup = {
    titleLabel: 'Pick a Date', //Optional
    todayLabel: 'Today', //Optional
    closeLabel: 'Close', //Optional
    setLabel: 'Set', //Optional
    errorMsgLabel: 'Please select time.', //Optional
    setButtonType: 'button-assertive', //Optional
    modalHeaderColor: 'bar-positive', //Optional
    modalFooterColor: 'bar-positive', //Optional
    templateType: 'popup', //Optional
    inputDate: $scope.datepickerObject.inputDate, //Optional
    mondayFirst: false, //Optional
    disabledDates: disabledDates, //Optional
    monthList: monthList, //Optional
    from: new Date(2015, 9, 1), //Optional
    callback: function (val) { //Optional
      datePickerCallbackPopup(val);
    }
  };

  var datePickerCallbackPopup = function (val) {
    if (typeof(val) === 'undefined') {
      console.log('No date selected');
    } else {
      $scope.datepickerObjectPopup.inputDate = val;
      newReceiptCtrl.date = val;
      // newReceiptCtrl.receiptObj.timeInMs = new Date(val).getTime();
      console.log('Selected date is : ', val)
    }
  };

  newReceiptCtrl.receiptObj = {
    shopName: '',
    total: '',
    shopType: '',
    userId: newReceiptCtrl.currentUser().uid
  }

  // newReceiptCtrl.receiptObj = $firebaseObject(firebaseService.receiptsRef.child(newReceiptCtrl.currentUser().uid))
  newReceiptCtrl.create = function() {
    var filesSelected = document.getElementById("file-upload").files;
    if (filesSelected.length > 0) {
      var fileToLoad = filesSelected[0];
      var fileReader = new FileReader();
      var imageString;

      fileReader.onload = function(fileLoadedEvent) {
      imageString = fileLoadedEvent.target.result; // <--- data: base64
      newReceiptCtrl.addReceipt(imageString);
    }
    fileReader.readAsDataURL(fileToLoad);
  }

  newReceiptCtrl.addReceipt = function(imageString) {
    newReceiptCtrl.receiptObj.imageString = imageString;
    newReceiptCtrl.receiptObj.date = ($scope.datepickerObjectPopup.inputDate).toString();
    newReceiptCtrl.receiptObj.dateInMs = new Date($scope.datepickerObjectPopup.inputDate).getTime();
    newReceiptCtrl.receipts.$add(newReceiptCtrl.receiptObj);
    // newReceiptCtrl.receiptObj.$save();
    $state.go('receipts.all');
    document.getElementById("file-upload").value = '';
    newReceiptCtrl.receiptObj = {};
  }
}
})

.controller('UserCtrl', function($state, firebaseService) {
  var userCtrl = this;

  userCtrl.signup = function() {
    var email = userCtrl.email;
    var password = userCtrl.password;
    firebaseService.signup(email, password);
  }
  userCtrl.login = function() {
    var email = userCtrl.email;
    var password = userCtrl.password;
    firebaseService.login(email, password);
  }

  userCtrl.logout = firebaseService.logout;
})

