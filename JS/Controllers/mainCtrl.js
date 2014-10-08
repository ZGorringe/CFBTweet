var app = angular.module('cfbTweet');

app.controller('mainCtrl', function ($scope, $firebase, loginService, mainService) {

  	$scope.login = function () {
  		return loginService.loginWithTwitter();
  	}

  	$scope.getUtah = function () {
  		debugger;
  		mainService.getUtahData($scope.utah)
  		.then(function(data) {
  			$scope.teamData = teamSorter(data);
  		})
  	}

  	// $scope.loggedIn = function () {
  	// 	return loginService.checkAuth();
  	// }

});