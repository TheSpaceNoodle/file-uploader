import Folders from '@/prisma/classes/Folder';
import { isFolderOwner } from '@/utils';
import { User } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

export const getUserFolders = async (req: Request) => {
  const user = req.user as User;

  const folders = await Folders.getUserFolders(user.id);

  return folders;
};

export const getCreateFolder = (_: Request, res: Response) => {
  res.render('create-folder');
};

export const getFolderById = async (req: Request, res: Response) => {
  if (isFolderOwner(req)) {
    const folder = await Folders.getFolderById(req.params.folderId);

    return res.render('folder', { folder });
  }

  return res.status(403);
};

export const postFolder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body as { name: string };

    await Folders.createFolder(body.name, (req.user as User).id);

    res.redirect('/');
  } catch (e) {
    next(e);
  }
};

export const updateFolder = async (req: Request, res: Response, next: NextFunction) => {
  if (isFolderOwner(req)) {
    try {
      const body = req.body as { name: string };

      await Folders.updateFolderName(req.params.folderId, body.name);

      return res.redirect(`/folders/${req.params.folderId}`);
    } catch (e) {
      return next(e);
    }
  }

  return res.status(403).redirect('/');
};

export const postDeleteFolder = async (req: Request, res: Response, next: NextFunction) => {
  if (isFolderOwner(req)) {
    try {
      await Folders.deleteFolder(req.params.id);

      res.redirect('/');
    } catch (e) {
      next(e);
    }
  }
};

export const postFileToFolder = () => {};

export const getFileById = () => {};

export const deleteFileById = () => {};
