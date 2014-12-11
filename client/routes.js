'use strict';

var User = require('./Model/user');
var Data = require('./Model/data');
var auth = require('../config/auth');
var mongoose = require('mongoose');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('../client/index');
var expressJwt = require('express-jwt');
var compose = require('composable-middleware');
var validateJwt = expressJwt({ secret: config.secrets.session });
var util = require('util');
var twitter = require('twitter');
var twit = new twitter({
    consumer_key: 'o7vPlD0BBhqi6uz9lEgcuzVd2',
    consumer_secret: 'PqzCq30D3M9KAzIYocCLGOybk9VqDRxhAvsiAKVDp9aj0zUcX0',
    access_token_key: '155258553-mljzzG0HpsqxZSNr1X0dADsOtLc8nX7OOhdeVjMI',
    access_token_secret: 'r8HC9TsbYFynt5Ow2NIYMYvQD0JLO4cW6r7gkT5qdzcTs'
});

function utahInfo(req, res, next) {
	twit.get('/statuses/show/27593302936.json', {include_entities:true}, function (data, res) {
	    console.log(util.inspect(data), res.statusCode);
	});
};

function getUtahInfo(req, res, next) {
	if (req.utahInfo()) { return next(); }
	res.redirect('/home');
	console.log('Success');
}

function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) { return next(); }
	res.redirect('/#/login');
	console.log('Authenticated');
}

function signToken(id) {
  return jwt.sign({ _id: id }, config.secrets.session, { expiresInMinutes: 60*5 });
}

function setTokenCookie(req, res, next) {
  if (!req.user) return res.json(404, { message: 'Something went wrong, please try again.'});
  var token = signToken(req.user._id, req.user.role);
  res.cookie('token', JSON.stringify(token));
  res.redirect('/profile');
  console.log(token);
}

function isLoggedIn (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/#/profile');
}


module.exports = function(app, passport) {

//LOCAL SIGNUP AND LOGIN SECTION//
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/#/profile',
		failureRedirect : '/#/signup',
		failureFlash : true
	}));

	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/#/profile',
		failureRedirect : '/#/login',
		failureFlash : true
	}));

//TWITTER ROUTES//
	app.get('/auth/twitter', passport.authenticate('twitter'));

	app.get('/auth/twitter/callback', passport.authenticate('twitter', {
		failureRedirect : '/login',
	}), setTokenCookie);

	app.get('/profile', ensureAuthenticated, function (req, res) {
		res.redirect('/#/profile');
		user : req.user;
		console.log('Authenticated');
	});

	app.get('/home', ensureAuthenticated, function (req, res) {
		res.render('homeTemplate.html', {
			user : req.user
		});
		console.log('Authenticated')
	});

	//TEAM SECTION//

	app.get('/utah', ensureAuthenticated, function (req, res) {
		res.render('utah.html', {
			user : req.user
		});
		twit.search('#Utes OR #UtahUtes OR #SackLakeCity', function (data) {
		    console.log((data));
		});
	});

	app.get('/byu', ensureAuthenticated, function (req, res) {
		res.render('byu.html', {
			user : req.user
		});
	});

	app.get('/utahState', ensureAuthenticated, function (req, res) {
		res. render('utahstate.html', {
			user : req.user
		});
	});

	//TWITTER API CALLS//

	app.get('/utahInfo', utahInfo);

};

// , {
// 			user : req.user
// 		});





