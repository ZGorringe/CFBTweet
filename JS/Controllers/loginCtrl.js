var app = angular.module('cfbTweet');

app.controller('loginCtrl', function ($scope, loginService, $location) {

	$scope.login = function () {
		return loginService.login($scope.details, function(user) {
			user.uid = user.uid.replace('simplelogin:', '');
			$scope.$apply(function() {
				$location.path('/dashboard/' + user.uid)
			});
		});
	};

	$scope.register = function () {
		return loginService.register($scope.details, function(user) {
			user.uid = user.uid.replace('simplelogin:', '');
			$scope.$apply(function() {
				$location.path('/dashboard/' + user.uid)
			});
		});
	};

	$scope.status = 'Register';
	$scope.showReg = function() {
		if($scope.status === 'Register') {
			$scope.status = 'Login';
		} else {
			$scope.reg = !$scope.reg;
		};
	}

});