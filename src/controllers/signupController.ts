import Users from '@/prisma/classes/User';
import { User } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

export const getSignup = (_: Request, res: Response) => {
  res.render('sign-up');
};

export const postSignup = async (req: Request, res: Response, next: NextFunction) => {
  const result = validationResult(req);

  if (!result.array()) {
    const body = req.body as User;

    try {
      await Users.signUp(body);

      return res.redirect('/login');
    } catch (e) {
      next(e);
    }
  }

  res.statusCode = 400;
  res.send({ errors: result.array() });
};
