var app = angular.module('cfbTweet');

app.service('loginService', function ($firebaseSimpleLogin) {

	var ref = new Firebase("https://cfb-tweet.firebaseio.com");

  	var authClient = $firebaseSimpleLogin(ref);

  	this.loginWithTwitter = function() {
      	authClient.$login("twitter").then(function(user) {
      	console.log("Logged in as: " + user.uid);
      	ref.child('users').child(user.uid.replace('twitter:', '')).set(user)
    	}, function(error) {
      		console.error("Login failed: " + error);
    	});
  	}
  	


})