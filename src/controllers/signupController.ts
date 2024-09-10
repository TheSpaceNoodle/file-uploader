import Users from '@/prisma/classes/User';
import { User } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

export const getSignup = (_: Request, res: Response) => {
  res.render('sign-up');
};

export const postSignup = async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body as User;
  try {
    console.log(body);
    await Users.signUp(body);

    return res.redirect('/login');
  } catch (e) {
    console.log(e);
    next(e);
  }
};
