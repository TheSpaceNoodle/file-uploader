import Folders from '@/prisma/classes/Folder';
import { User } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

import multer, { Multer } from 'multer';

export const getUserFolders = async (req: Request, res: Response) => {
  const user = req.user as User;

  const folders = await Folders.getUserFolders(user.id);

  res.status(200).send(folders);
};

export const getCreateFolder = (_: Request, res: Response) => {
  res.render('create-folder');
};

export const getFolderById = async (req: Request, res: Response) => {
  const folder = await Folders.getFolderById(req.params.folderId);

  return res.render('folder', { folder });
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
  try {
    const body = req.body as { name: string };

    await Folders.updateFolderName(req.params.folderId, body.name);

    return res.redirect(`/folders/${req.params.folderId}`);
  } catch (e) {
    return next(e);
  }
};

export const postDeleteFolder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await Folders.deleteFolder(req.params.id);

    res.redirect('/');
  } catch (e) {
    next(e);
  }
};

const upload: Multer = multer({ storage: multer.memoryStorage() });

export const postFileToFolder = [
  upload.single('file'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await Folders.uploadFile(req.file, req.params.folderId);

      res.redirect('back');
    } catch (e) {
      next(e);
    }
  },
];

export const postShareFolder = async (req: Request, _: Response, next: NextFunction) => {
  const { duration } = req.body as { duration: number };

  if (duration <= 0) {
    return next();
  }

  const date = new Date();
  date.setDate(new Date().getDate() + 10);

  await Folders.shareFolder(req.params.folderId, date);

  next();
};

export const getFileById = async (req: Request, res: Response, next: NextFunction) => {
  const fileUrl = await Folders.downloadFile(req.params.fileId);

  if (fileUrl) {
    res.redirect(fileUrl);
  }

  res.status(500);
  next();
};

export const deleteFileById = async (req: Request, res: Response) => {
  await Folders.deleteFileById(req.params.fileId);
  res.redirect('/');
};
