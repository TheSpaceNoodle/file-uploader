import {
  getUserFolders,
  getFolderById,
  updateFolder,
  postFolder,
  postDeleteFolder,
  postFileToFolder,
  getFileById,
  getCreateFolder,
  deleteFileById,
  postShareFolder,
} from '@/controllers/foldersController';
import { Router } from 'express';

const router = Router();

router.get('/', getUserFolders);
router.get('/create', getCreateFolder);
router.post('/create', postFolder);

router.get('/:folderId', getFolderById);
router.post('/:folderId/delete', postDeleteFolder);
router.post('/:folderId/update', updateFolder);
router.post('/:folderId/upload', postFileToFolder);
router.post('/:folderId/share', postShareFolder);

router.get('/:folderId/:fileId', getFileById);
router.delete('/file/:fileId/delete', deleteFileById);

export default router;
