var app = angular.module('cfbTweet');

app.service('mainService', function ($http, $q) {

	this.getUtahData = function(utah) {
		var deferred = $q.defer();
		$http ({
			method: 'GET',
			url: 'https://api.twitter.com/1.1/search/tweets.json?q=%universityofutah',
			crossDomain: true
		}).then(function(data){ 
			var teamData = data.data.results;
			deferred.resolve(teamData);
			console.log(teamData);
		});
		return deferred.promise;
	};

})