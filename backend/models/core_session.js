const mongoose = require('mongoose');

const core_session = new mongoose.Schema({
	member_id: {
		type: String,
		required: true
	},
	token: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('core_session', core_session);
