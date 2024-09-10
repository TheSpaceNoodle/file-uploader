import { Request, RequestHandler, Response } from 'express';
import passport from 'passport';

export const getLogin = (_: Request, res: Response) => {
  res.render('login');
};

// Was trying to find a way to fix first parameter typing in @types/passport but me being too stupid ruined it
export const postLogin = [
  passport.authenticate('local', { failureMessage: true }) as RequestHandler,
  (_: Request, res: Response) => {
    res.redirect('/');
  },
];
