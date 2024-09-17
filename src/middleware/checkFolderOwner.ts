import { UserWithFolders } from '@/prisma/models';
import { NextFunction, Request, Response } from 'express';

const checkFolderOwner = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as UserWithFolders;

  if (!req.params.folderId) {
    return next();
  }

  if (user.Folder.find((folder) => folder.id === req.params.folderId)) {
    return next();
  }

  return res.redirect('/');
};

export default checkFolderOwner;
