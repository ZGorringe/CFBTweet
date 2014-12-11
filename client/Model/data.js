var mongoose = require('mongoose');

var dataSchema = mongoose.Schema({

	twitter			: {
		id 			: String,
		text		: String
	}

});

module.exports = mongoose.model('Data', dataSchema);