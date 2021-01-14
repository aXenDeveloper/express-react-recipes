import mongoose, { Document, Schema, model } from 'mongoose';

interface core_sessionInterface extends Document {
	member_id: string;
	token: string;
}

const core_session = new Schema({
	member_id: {
		type: String,
		required: true
	},
	token: {
		type: String,
		required: true
	}
});

export default model<core_sessionInterface>('core_session', core_session);
