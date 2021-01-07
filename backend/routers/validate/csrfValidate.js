const jwt = require('jsonwebtoken');

const Member = require('../../models/core_members');
const Session = require('../../models/core_session');

const csrfValidate = async (req, res, next) => {
	try {
		const sesionExist = await Session.findOne({
			token: req.header('CSRF_Token')
		});

		if (!sesionExist)
			return res.status(401).json({
				message: 'Access denied!'
			});

		const verified = jwt.verify(sesionExist.token, process.env.CSRF_TOKEN);
		const memberExist = await Member.findOne({
			_id: verified._id
		});

		if (!memberExist)
			return res.status(401).json({
				message: 'Access denied! - User not found'
			});

		next();
	} catch (err) {
		return res.status(500).json({
			message: 'Something is wrong!'
		});
	}
};

module.exports = csrfValidate;
