import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import jwt, { verify } from 'jsonwebtoken';

import Member from '../../models/core_members';
import Session from '../../models/core_session';
import Recipe_posts from '../../models/recipe_posts';

const authorValidate = async (req: Request, res: Response, next: NextFunction) => {
	try {
		if (!process.env.CSRF_TOKEN)
			return res.status(500).json({
				message: 'CSRF_TOKEN key not found in the .env file.'
			});

		const sesionExist = await Session.findOne({
			token: req.header('CSRF_Token')
		});

		if (!sesionExist) return res.status(401).json("You don't have permissions.");

		const verifyMember: any = verify(sesionExist.token, process.env.CSRF_TOKEN);
		const memberExist = await Member.findOne({
			_id: verifyMember._id
		});

		if (!memberExist) return res.status(400).json('The user does not exist!');

		const recipeExist = await Recipe_posts.findOne({
			_id: req.query.id as string
		});

		if (!recipeExist) return res.status(400).json('The recipe does not exist!');

		const recipeMemberID = (recipeExist.member_id as string).toString();
		const memberExistID = (memberExist._id as string).toString();

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

export default authorValidate;
