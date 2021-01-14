import mongoose, { Document, Schema, model } from 'mongoose';

interface recipe_postsInterface extends Document {
	title: string;
	member_id: string;
	member_name: string;
	category: string;
	image_url: string;
	ingredients: string;
	date: string;
	description: string;
}

const recipe_posts = new Schema({
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
		default: '[]'
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

export default model<recipe_postsInterface>('recipe_posts', recipe_posts);
