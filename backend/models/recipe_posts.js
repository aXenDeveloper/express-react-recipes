const mongoose = require('mongoose');

const recipe_posts = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	mamber_id: {
		type: String,
		required: true
	},
	category: {
		type: String,
		required: true
	},
	imageURL: {
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
