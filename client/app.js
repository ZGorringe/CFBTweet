var app = angular.module('cfbTweet', ['ngRoute', 'ngAnimate', 'ngCookies', 'ngResource', 'ngTouch', 'ngSanitize']);


app.config(['$routeProvider', 
	function($routeProvider) {
		$routeProvider.
			when('/', {
				templateUrl: 'partials/homeTemplate.html',
				controller: 'mainCtrl'
			}).
			when('/teams/:team', {
				templateUrl: 'partials/teamTemplate.html',
				controller: 'teamCtrl',
				resolve: {
					teamData: function($route) {
						return ($route.current.params.team);
					}
				}
			}).
			when('/media', {
				templateUrl: 'partials/mediaTemplate.html',
				controller: 'mediaCtrl'
			}).
			when('/matchup', {
				templateUrl: 'partials/matchupTemplate.html',
				controller: 'matchupCtrl'
			}).
			when('/login', {
				templateUrl: 'partials/loginTemplate.html',
				controller: 'mainCtrl'
			}).
			when('/signup', {
				templateUrl: 'partials/signupTemplate.html',
				controller: 'mainCtrl'
			}).
			when('/profile', {
				templateUrl: 'partials/profileTemplate.html',
				controller: 'loginCtrl'
			}).
			otherwise ({
				redirectTo: 'partials/homeTemplate.html'
			});
	}]);

