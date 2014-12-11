var LocalStrategy = require('passport-local').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var User = require('../client/Model/user');
var configAuth = require('./auth');
var OAuthStrategy = require('passport-oauth').OAuthStrategy;
var TokenStrategy = require('passport-http-oauth').TokenStrategy;

module.exports = function (passport) {

	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function (id, done) {
		User.findById(id, function (err, user) {
			done(err, user);
		});
	});

	//TEST OAUTH TO GET REQUEST AND ACCESS TOKENS//
	// passport.use('twitter', new OAuthStrategy({
	// 	requestTokenURL: 'https://api.twitter.com/oauth/request_token',
	// 	accessTokenURL: 'https://api.twitter.com/oauth/access_token',
	// 	userAuthorizationURL: 'https://api.twitter.com/oauth/authorize',
	// 	consumerKey : configAuth.twitterAuth.consumerKey,
	// 	consumerSecret : configAuth.twitterAuth.consumerSecret,
	// 	callbackURL : configAuth.twitterAuth.callbackURL
	// },
	// function (token, tokenSecret, profile, done) {
	// 	process.nextTick(function () {
	// 		User.findOne({ 'twitter.id' : profile.id }, function (err, user) {
	// 			if (err) {
	// 				return done(err);
	// 			}
	// 			if (user) {
	// 				return done(null, user);
	// 			} else {
	// 				var newUser = new User();
	// 				newUser.twitter.id = profile.id;
	// 				newUser.twitter.token = token;
	// 				newUser.twitter.username = profile.username;
	// 				newUser.twitter.displayName = profile.displayName;
	// 				newUser.save(function (err) {
	// 					if (err) {
	// 						throw err;
	// 					}
	// 					return done(null, newUser);
	// 				});
	// 			}
	// 		});
	// 	});
	// }));

	//TOKEN STRATEGY//
	passport.use('token', new TokenStrategy(
  		function(consumerKey, done) {
    		Consumer.findOne({ key: consumerKey }, function (err, consumer) {
      			if (err) { 
      				return done(err); 
      			}
      			if (!consumer) { 
      				return done(null, false); 
      			}
      		return done(null, consumer, consumer.secret);
    	});
  	},
  	function(accessToken, done) {
	    AccessToken.findOne({ token: accessToken }, function (err, token) {
		    if (err) { 
		    	return done(err); 
		    }
		    if (!token) { 
		      	return done(null, false); 
		    }
		    Users.findById(token.userId, function(err, user) {
		      	if (err) { 
		        	return done(err); 
		        }
		        if (!user) { 
		        	return done(null, false); 
		        }
		        // fourth argument is optional info.  typically used to pass
		        // details needed to authorize the request (ex: `scope`)
		        return done(null, user, token.secret, { scope: token.scope });
		    });
	    });
	},
	  function(timestamp, nonce, done) {
	    // validate the timestamp and nonce as necessary
	    done(null, true)
	  }
	));

	//LOCAL SIGNUP//
	passport.use('local-signup', new LocalStrategy({
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback : true
	},
	function (req, email, password, done) {
		process.nextTick(function () {
			User.findOne({ 'local.email' : email }, function (err, user) {
				if (err) {
					console.log(err);
					return done(err);
				}
				if (user) {
					console.log('That email is already in use');
					return done(null, false, req.flash('signupMessage', 'That email is already in use'));
				} else {
					var newUser = new User();
					newUser.local.email = email;
					newUser.local.password = newUser.generateHash(password);
					newUser.save(function (err) {
						if (err) {
							throw err;
						}
						return done(null, newUser);
					});
				}
			});
		});
	}));

	//LOCAL LOGIN//
	passport.use('local-login', new LocalStrategy({
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback : true
	},
	function (req, email, password, done) {
		User.findOne({ 'local.email' : email }, function (err, user) {
			if (err) {
				console.log(err);
				return done(err);
			}
			if (!user) {
				console.log('No user found.');
				return done(null, false, req.flash('loginMessage', 'No user found.'));
			}
			if (!user.validPassword(password)) {
				console.log('Password or Username doesn\'t match records');
				return done(null, false, req.flash('loginMessage', 'Password or Username doesn\'t match records'));
			}
			return done(null, user);
		});
		console.log('Logged in as ' + user);
	}));

	// TWITTER LOGIN//
	passport.use(new TwitterStrategy({
		consumerKey : configAuth.twitterAuth.consumerKey,
		consumerSecret : configAuth.twitterAuth.consumerSecret,
		callbackURL : configAuth.twitterAuth.callbackURL
	},
	function (token, tokenSecret, profile, done) {
		process.nextTick(function () {
			User.findOne({ 'twitter.id' : profile.id }, function (err, user) {
				if (err) {
					return done(err);
				}
				if (user) {
					return done(null, user);
				} else {
					var newUser = new User();
					newUser.twitter.id = profile.id;
					newUser.twitter.token = token;
					newUser.twitter.username = profile.username;
					newUser.twitter.displayName = profile.displayName;
					newUser.twitter.profilePic = profile.photos[0].value;
					newUser.save(function (err) {
						if (err) {
							throw err;
						}
						return done(null, newUser);
					});
				}
			});
		});
	}));

	//TWITTER AUTHORIZATION//
	// passport.use('twitter-auth', new TwitterStrategy({
	// 	consumerKey : configAuth.twitterAuth.consumerKey,
	// 	consumerSecret : configAuth.twitterAuth.consumerSecret,
	// 	callbackURL : configAuth.twitterAuth.callbackURL
	// }, function (token, tokenSecret, profile, done) {
	// 	Account.findOne({ domain: 'twitter.com', uid: profile.id }, function (err, account) {
	// 		if (err) {
	// 			return done(err);
	// 		}
	// 		if (account) {
	// 			return done(null, account);
	// 		} else {
	// 			var account = 
	// 		}
	// 	})
	// }))
};