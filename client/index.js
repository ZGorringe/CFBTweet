'use strict';

var all = {
	env: process.env.NODE_ENV,

	port: process.env.port || 8080,

	secrets: {
		session: 'CFBTweet'
	},

	mongo: {
		options: {
			db: {
				safe: true
			}
		}
	},
};

module.exports = all;