angular.module('receiptsApp')
.controller('MainCtrl', function() {
  var mainCtrl = this;

})

.controller('ReceiptsCtrl', function($scope, firebaseService) {
  var receiptsCtrl = this;
  receiptsCtrl.receipts = firebaseService.receipts;

  receiptsCtrl.orderReceipts = function(dateString) {
    console.log(dateString);
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

.controller('NewReceiptCtrl', function($scope, firebaseService, $state) {
  var newReceiptCtrl = this;
  newReceiptCtrl.date = new Date();
  newReceiptCtrl.receipts = firebaseService.receipts;

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
      shopType: ''
    }

    newReceiptCtrl.create = function() {
      newReceiptCtrl.receiptObj.date = ($scope.datepickerObjectPopup.inputDate).toString();
      newReceiptCtrl.receiptObj.dateInMs = new Date($scope.datepickerObjectPopup.inputDate).getTime();
      newReceiptCtrl.receipts.$add(newReceiptCtrl.receiptObj);
      $state.go('receipts.all');
      newReceiptCtrl.receiptObj = {};
    }


  })

