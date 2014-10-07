var app = angular.module('cfbTweet', ['ngRoute', 'firebase']);


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
			otherwise ({
				redirectTo: 'partials/homeTemplate.html'
			});
	}]);

