const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const csrfValidate = require('./validate/csrfValidate');

// Import models
const Member = require('../models/core_members');
const Session = require('../models/core_session');

router.post('/register', async (req, res) => {
	const { email, name, password } = req.body;

	const nameExist = await Member.findOne({ name });
	if (nameExist)
		return res.status(400).json({
			message: 'Display name already exist!'
		});

	const emailExist = await Member.findOne({ email });
	if (emailExist)
		return res.status(400).json({
			message: 'Email already exist!'
		});

	const hashedPassword = await bcrypt.hash(password, 10);

	const createMember = new Member({
		name,
		email,
		password: hashedPassword
	});

	try {
		await createMember.save();

		return res.json({
			message: 'Created account success!',
			id_member: createMember._id
		});
	} catch (err) {
		res.status(400).send(err);
	}
});

router.post('/login', async (req, res) => {
	const { email, password } = req.body;

	const memberExist = await Member.findOne({ email });
	if (!memberExist)
		return res.status(400).json({
			message: 'Email or password is wrong!'
		});

	const validPassword = await bcrypt.compare(password, memberExist.password);
	if (!validPassword)
		return res.status(400).json({
			message: 'Email or password is wrong!'
		});

	const token = jwt.sign({ _id: memberExist._id }, process.env.CSRF_TOKEN);
	res.header('CSRF-token', token);

	const createCSRF = new Session({
		member_id: memberExist._id,
		token
	});

	try {
		await createCSRF.save();

		return res.json({
			message: 'Logged in!',
			member: memberExist,
			CSRF_token: token
		});
	} catch (err) {
		res.status(400).send(err);
	}
});

router.get('/verifyCSRF', async (req, res) => {
	const sesionExist = await Session.findOne({
		token: req.header('CSRF_Token')
	});

	if (!sesionExist)
		return res.status(401).json({
			message: 'Access denied!'
		});

	try {
		const verified = jwt.verify(sesionExist.token, process.env.CSRF_TOKEN);
		const memberExist = await Member.findOne({
			_id: verified._id
		});

		if (!memberExist)
			return res.status(401).json({
				message: 'Access denied! - User not found'
			});

		return res.json({
			message: 'CSRF Token is correct!',
			member: memberExist
		});
	} catch (err) {
		res.status(400).json({
			message: 'Invalid token!'
		});
	}
});

router.delete('/logout', csrfValidate, async (req, res, next) => {
	await Session.findOneAndDelete({
		token: req.header('CSRF_Token')
	});

	try {
		res.json({
			message: 'Successfully logout.'
		});
	} catch (err) {
		res.status(400).send(err);
	}
});

module.exports = router;
