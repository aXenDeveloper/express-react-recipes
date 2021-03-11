import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import Member from '../../models/core_members';
import Session from '../../models/core_session';

export const csrfValidate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!process.env.CSRF_TOKEN)
      return res.status(500).json({
        message: 'CSRF_TOKEN key not found in the .env file.'
      });

    const sesionExist = await Session.findOne({
      token: req.header('CSRF_Token')
    });

    if (!sesionExist)
      return res.status(401).json({
        message: 'Access denied!'
      });

    const verified: any = verify(sesionExist.token, process.env.CSRF_TOKEN);
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

export const csrfValidateByPath = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!process.env.CSRF_TOKEN)
      return res.status(500).json({
        message: 'CSRF_TOKEN key not found in the .env file.'
      });

    if (!req.query.csrf)
      return res.status(500).json({
        message: 'You have to provide CSRF key to upload file.'
      });

    const sesionExist = await Session.findOne({
      token: req.query.csrf?.toString()
    });

    if (!sesionExist)
      return res.status(401).json({
        message: 'Access denied!'
      });

    const verified: any = verify(sesionExist.token, process.env.CSRF_TOKEN);
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
