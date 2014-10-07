var app = angular.module('cfbTweet');

app.service('mainService', function($scope, $firebase, $q, $http) {

	// this.getData = function() {
	// 	return $http({
	// 		method: 'GET',
	// 		url: 'https://api.twitter.com/1.1/search/tweets.json?q=%universityofutah'
	// 	})
	// 	.then(function(data) {
	// 		return data.data.results;
	// 	})
	// }

	// var ref = new Firebase("https://cfb-tweet.firebaseio.com/");

	// var auth = new FirebaseSimpleLogin(chatRef, function(error, user) {
 //  		if (error) {
 //    // an error occurred while attempting login
 //    		alert(error);
 //  		} else if (user) {
 //    // user authenticated with Firebase
 //    		alert('User ID: ' + user.id + ', Provider: ' + user.provider);
 //  		} else {
 //    // user is logged out
 //  		}
	// });

	// auth.login('twitter');

})