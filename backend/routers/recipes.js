const router = require('express').Router();
const csrfValidate = require('./validate/csrfValidate');
const multer = require('multer');
const jwt = require('jsonwebtoken');

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
	if (!title || !category || !description) return res.status(400).json({ message: 'Not all fields have been completed!' });

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
