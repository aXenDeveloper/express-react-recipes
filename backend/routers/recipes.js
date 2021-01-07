const router = require('express').Router();
const csrfValidate = require('./validate/csrfValidate');
const authorValidate = require('./validate/authorValidate');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const Recipe_posts = require('../models/recipe_posts');
const Member = require('../models/core_members');
const Session = require('../models/core_session');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './public/uploads');
	},
	filename: function (req, file, cb) {
		cb(null, new Date().toISOString().replace(':', '_').replace(':', '_') + file.originalname);
	}
});

const upload = multer({
	storage: storage
}).single('productImage');

router.post('/add', csrfValidate, upload, async (req, res) => {
	const sesionExist = await Session.findOne({
		token: req.header('CSRF_Token')
	});

	const { title, category, ingredients, description } = req.body;
	if (!title || !category || !description || !req.file) return res.status(400).json({ message: 'Not all fields have been completed!' });

	const verified = jwt.verify(sesionExist.token, process.env.CSRF_TOKEN);

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
router.post('/upload-image', csrfValidate, upload, (req, res) => {});

router.get('/', async (req, res) => {
	const recipe = await Recipe_posts.find({});
	return res.json({ recipe });
});

router.get('/item', async (req, res) => {
	try {
		const recipeItem = await Recipe_posts.findOne({
			_id: mongoose.Types.ObjectId(req.query.id)
		});

		if (!recipeItem) return res.status(404).json({ message: 'Invalid item ID!' });

		return res.json({ recipeItem });
	} catch (err) {
		return res.status(404).json({ message: 'Invalid item ID!' });
	}
});

router.patch('/edit', csrfValidate, authorValidate, async (req, res) => {
	const { title, category, ingredients, description } = req.body;
	if (!title || !category || !description) return res.status(400).json({ message: 'Not all fields have been completed!' });

	try {
		const recipe = await Recipe_posts.findByIdAndUpdate(
			mongoose.Types.ObjectId(req.query.id),
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

router.delete('/delete', csrfValidate, authorValidate, async (req, res) => {
	try {
		await Recipe_posts.findByIdAndRemove(mongoose.Types.ObjectId(req.query.id));

		return res.json({ message: 'Successfully deleted!' });
	} catch (err) {
		return res.status(404).json({ message: 'Invalid item ID!', err });
	}
});

module.exports = router;
