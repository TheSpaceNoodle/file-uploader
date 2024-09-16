import { NextFunction, Request, Response } from 'express';

const authenticatedRoute = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(403).redirect('/login');
  }

  next();
};

export default authenticatedRoute;
