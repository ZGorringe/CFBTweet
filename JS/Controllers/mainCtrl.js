var app = angular.module('cfbTweet');

var userObj;

app.controller('mainCtrl', function ($scope, $firebase, loginService, mainService) {

  	$scope.login = function () {
      loginService.loginWithTwitter()
        .then(function (user) {
          return userObj = user;
      });
  	}

  	$scope.getUtah = function () {
  		mainService.getUtahData(userObj)
    		.then(function(data) {
    			$scope.teamData = teamSorter(data);
    		})
  	}

  	// $scope.loggedIn = function () {
  	// 	return loginService.checkAuth();
  	// }

});