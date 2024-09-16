import UserWithFolders from '@/prisma/models/UserWithFolders';
import { Request, Response, Router } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const user = req.user as UserWithFolders;

  console.log(user.Folder);

  res.render('index', { user, folders: user?.Folder });
});

export default router;
