const router = require('express').Router();
const csrfValidate = require('./validate/csrfValidate');
const multer = require('multer');
const Recipe_posts = require('../models/recipe_posts');

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
	const { title, category, ingredients, description } = req.body;

	if (!title || !category || !description) return res.status(400).json({ message: 'Not all fields have been completed!' });

	const createRecipe = new Recipe_posts({
		title,
		category,
		ingredients,
		description
	});

	try {
		await createRecipe.save();

		return res.json({
			message: 'The recipe has been added!'
		});
	} catch (err) {
		res.status(400).send(err);
	}
});

router.get('/', async (req, res) => {
	const recipe = await Recipe_posts.find({});
	return res.json({ recipe });
});

module.exports = router;
