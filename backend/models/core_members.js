const mongoose = require('mongoose');

const core_membersSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	},
	group_id: {
		type: Number,
		default: 3
	}
});

module.exports = mongoose.model('core_members', core_membersSchema);
