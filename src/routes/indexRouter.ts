import UserWithFolders from '@/prisma/models/UserWithFolders.ts';
import { Request, Response, Router } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const user = req.user as UserWithFolders;

  res.render('index', { user, folders: user?.Folder });
});

export default router;
