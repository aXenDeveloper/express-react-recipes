const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const Member = require('../../models/core_members');
const Session = require('../../models/core_session');
const Recipe_posts = require('../../models/recipe_posts');

const authorValidate = async (req, res, next) => {
	try {
		const sesionExist = await Session.findOne({
			token: req.header('CSRF_Token')
		});

		const verifyMember = jwt.verify(sesionExist.token, process.env.CSRF_TOKEN);
		const memberExist = await Member.findOne({
			_id: verifyMember._id
		});

		const recipeExist = await Recipe_posts.findOne({
			_id: mongoose.Types.ObjectId(req.query.id)
		});

		const recipeMemberID = mongoose.Types.ObjectId(recipeExist.member_id).toString();
		const memberExistID = mongoose.Types.ObjectId(memberExist._id).toString();

		if (recipeMemberID !== memberExistID && memberExist.group_id !== 4)
			return res.status(401).json({
				message: "You don't have permissions."
			});

		next();
	} catch (err) {
		return res.status(500).json({
			message: 'Something is wrong!'
		});
	}
};

module.exports = authorValidate;
