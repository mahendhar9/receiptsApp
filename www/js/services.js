angular.module('receiptsApp')
.service('firebaseService', function($state, $firebaseArray, $firebaseAuth, $firebaseObject) {
  var firebaseService = this;

  firebaseService.rootRef = new Firebase("https://receiptsApp.firebaseio.com/");
  firebaseService.auth = $firebaseAuth(firebaseService.rootRef);
  firebaseService.userRef = firebaseService.rootRef.child("users");
  firebaseService.receiptsRef = firebaseService.rootRef.child("receipts");
  firebaseService.receipts = $firebaseArray(firebaseService.receiptsRef);
  
  

  firebaseService.signup = function(email, password) {
    firebaseService.rootRef.createUser({
      email    : email,
      password : password
    }, function(error, userData) {
      if (error) {
        console.log("Error creating user:", error);
      } else {
        console.log("Successfully created user account with uid:", userData.uid);
        firebaseService.login(email, password);
      }
    });
  }

  firebaseService.login = function(email, password) {
    firebaseService.rootRef.authWithPassword({
      email    : email,
      password : password
    }, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
        firebaseService.userObj = $firebaseObject(firebaseService.userRef.child(authData.uid));
        firebaseService.userObj.uid = authData.uid;
        firebaseService.userObj.email = authData.password.email;

        firebaseService.userRef.child(firebaseService.userObj.uid).once('value', function(snapshot) {
          var exists = (snapshot.val() !== null);
          console.log("Does user exist? " + exists);
          if (!exists) {
            firebaseService.userObj.$save();
            console.log("User added")
            
          }
          else {
            console.log("User not added");
          }
        });
        $state.go('receipts.all');
      }
    })
  }

  firebaseService.logout = function() {
    firebaseService.auth.$unauth();
    $state.go('receipts.login');
  }

  firebaseService.auth.$onAuth(function(authData) {
    if (authData) {
      console.log(authData);
      firebaseService.currentUser = authData;
      firebaseService.isLoggedIn = true;
    } else {
      console.log("AuthData LoggedOut" );
      firebaseService.isLoggedIn = false;
    }
  });

})

