import { Request, Response, Router } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const user = req.session.passport?.user;

  res.render('index', { user, folders: user?.folders || [] });
});

export default router;
