import mongoose, { Document, Schema, model } from 'mongoose';

interface core_membersInterface extends Document {
	name: string;
	email: string;
	password: string;
	date: string;
	group_id: number;
}

const core_membersSchema = new Schema({
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
		default: Date.now()
	},
	group_id: {
		type: Number,
		default: 3
	}
});

export default model<core_membersInterface>('core_members', core_membersSchema);
