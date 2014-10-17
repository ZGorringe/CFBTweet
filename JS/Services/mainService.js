var app = angular.module('cfbTweet');

app.service('mainService', function ($http, $q) {

	this.getUtahData = function(user) {
		var deferred = $q.defer();
		debugger
		$http ({
			method: 'GET',
			url: 'https://api.twitter.com/1.1/users/search.json?q=Utah&page=1&count=3',
			crossDomain: true,
			data: user
		}).then(function(data){ 
			var teamData = data.data.results;
			deferred.resolve(teamData);
			console.log(teamData);
		});
		return deferred.promise;
	};

});