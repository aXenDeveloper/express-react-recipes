const mongoose = require('mongoose');

const recipe_posts = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	member_id: {
		type: String,
		required: true
	},
	member_name: {
		type: String,
		required: true
	},
	category: {
		type: String,
		required: true
	},
	image_url: {
		type: String,
		required: true
	},
	ingredients: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now()
	},
	description: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('recipe_posts', recipe_posts);
