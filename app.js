var app = angular.module('cfbTweet', ['ngRoute', 'homeCtrl', 'teamCtrl']);

app.config(function($routeProvider, $httpProvider){
  $httpProvider.interceptors.push('httpRequestInterceptor');

  $routeProvider.when('/',{
  	templateUrl: '/home.homeTemplate.html',
  	controller: 'homeCtrl'
  }).when('/teams/:team', {
  	templateUrl: 'teams/teamTemplate.html',
  	controller: 'teamCtrl'
  }).otherwise('/', {
  	templateUrl: '/home/homeTemplate.html',
  	controller: 'homeCtrl'
  });

})