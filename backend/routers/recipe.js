const router = require('express').Router();
const csrf = require('./csrf');

const Recipe_posts = require('../models/recipe_posts');

router.post('/add', csrf, async (req, res) => {
	const { title, ingredients, description } = req.body;

	const createRecipe = new Recipe_posts({
		title,
		ingredients,
		description
	});

	try {
		await createRecipe.save();

		return res.json({
			message: 'The recipe has been added!',
			error: false
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
