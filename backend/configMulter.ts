import { Options, diskStorage } from 'multer';
import { resolve } from 'path';

export const multerConfig = {
	dest: './public/uploads',
	storage: diskStorage({
		destination: (req, file, callback) => {
			callback(null, './public/uploads');
		},
		filename: (req, file, callback) => {
			callback(null, new Date().toISOString().replace(':', '_').replace(':', '_') + file.originalname);
		}
	}),
	fileFilter: (req, file, cb) => {
		if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
			cb(null, true);
		} else {
			cb(null, false);
		}
	}
} as Options;
