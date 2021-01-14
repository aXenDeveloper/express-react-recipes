import { Request, Response, Router } from 'express';
const router = Router();
import mongoose from 'mongoose';
import * as multer from 'multer';
import jwt, { verify } from 'jsonwebtoken';

import { multerConfig } from '../configMulter';

import csrfValidate from './validate/csrfValidate';
import authorValidate from './validate/authorValidate';
import Recipe_posts from '../models/recipe_posts';
import Member from '../models/core_members';
import Session from '../models/core_session';

/* const destination = (req: Request, file: any, cb: any) => {
	cb(null, './public/uploads');
};

const filename = (req: any, file: any, cb: any) => {
	cb(null, new Date().toISOString().replace(':', '_').replace(':', '_') + file.originalname);
};

const fileFilter = (req: any, file: any, cb: any) => {
	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
		cb(null, true);
	} else {
		cb(null, false, '');
	}
};

const storage = diskStorage({
	destination,
	filename
});

const upload = multer({
	storage,
	fileFilter
}); */

router.post('/add', csrfValidate, multer(multerConfig).single('productImage'), async (req: Request, res: Response) => {
	if (!process.env.CSRF_TOKEN)
		return res.status(500).json({
			message: 'CSRF_TOKEN key not found in the .env file.'
		});

	const sesionExist = await Session.findOne({
		token: req.header('CSRF_Token')
	});

	if (!sesionExist)
		return res.status(400).json({
			message: 'Invalid CSRF_Token!'
		});

	const { title, category, ingredients, description } = req.body;
	if (!title || !category || !description || !req.file)
		return res.status(400).json({ message: 'Not all fields have been completed!' });

	const verified: any = verify(sesionExist.token, process.env.CSRF_TOKEN);

	const memberExist = await Member.findOne({
		_id: verified._id
	});

	if (!memberExist)
		return res.status(400).json({
			message: 'User id not found!'
		});

	const createRecipe = new Recipe_posts({
		title,
		member_id: memberExist._id,
		member_name: memberExist.name,
		image_url: req.file.filename,
		category,
		ingredients,
		description
	});

	try {
		const addRecipe = await createRecipe.save();

		return res.json({
			message: 'The recipe has been added!',
			recipe_id: addRecipe._id
		});
	} catch (err) {
		res.status(400).send(err);
	}
});

// Test
router.post('/upload-image', csrfValidate, multer(multerConfig).single('productImage'), (req: Request, res: Response) => {});

router.get('/', async (req: Request, res: Response) => {
	const recipe = await Recipe_posts.find({});
	return res.json({ recipe });
});

router.get('/item', async (req: Request, res: Response) => {
	try {
		const recipeItem = await Recipe_posts.findOne({
			_id: req.query.id as string
		});

		if (!recipeItem) return res.status(404).json({ message: 'Invalid item ID! eee' });

		return res.json({ recipeItem });
	} catch (err) {
		return res.status(404).json({ message: 'Invalid item ID!' });
	}
});

router.patch('/edit', csrfValidate, authorValidate, async (req: Request, res: Response) => {
	const { title, category, ingredients, description } = req.body;
	if (!title || !category || !description) return res.status(400).json({ message: 'Not all fields have been completed!' });

	try {
		const recipe = await Recipe_posts.findByIdAndUpdate(
			req.query.id as string,
			{
				title,
				category,
				ingredients,
				description
			},
			{ new: true }
		);

		if (!recipe) return res.status(404).json({ message: 'The recipe does not exist!' });

		return res.json({
			message: 'Edit success!',
			recipe: recipe
		});
	} catch (err) {
		return res.status(404).json({ message: 'Invalid item ID!', err });
	}
});

router.delete('/delete', csrfValidate, authorValidate, async (req: Request, res: Response) => {
	try {
		await Recipe_posts.findByIdAndRemove(req.query.id as string);

		return res.json({ message: 'Successfully deleted!' });
	} catch (err) {
		return res.status(404).json({ message: 'Invalid item ID!', err });
	}
});

export default router;
