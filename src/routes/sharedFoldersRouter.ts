import { getFileById } from '@/controllers/foldersController.ts';
import Folders from '@/prisma/classes/Folder.ts';
import { Request, Response, Router } from 'express';

const router = Router();

router.get('/:folderId', async (req: Request, res: Response) => {
  const folder = await Folders.getFolderById(req.params.folderId);

  if (!folder || !folder.isPublic) {
    return res.status(404).send({ message: '404 Not Found' });
  }

  if (folder.sharedUntil && Date.parse(folder.sharedUntil.toString()) <= Date.now()) {
    await Folders.unshareFolder(req.params.folderId);
    return res.status(404).send({ message: '404 Not Found' });
  }

  res.render('shared-folder', { folder });
});

router.get('/:folderId/:fileId', getFileById);

export default router;
