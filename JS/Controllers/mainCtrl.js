var app = angular.module('cfbTweet');

app.controller('mainCtrl', function($scope, $firebase, $firebaseSimpleLogin) {

	var ref = new Firebase("https://cfb-tweet.firebaseio.com");
  	var authClient = $firebaseSimpleLogin(ref);

  	$scope.loginWithTwitter = function() {
      authClient.$login("twitter").then(function(user) {
      console.log("Logged in as: " + user.uid);
    }, function(error) {
      console.error("Login failed: " + error);
    });
  }

});