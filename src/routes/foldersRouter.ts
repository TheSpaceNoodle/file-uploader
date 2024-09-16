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
} from '@/controllers/foldersController';
import { Router } from 'express';

const router = Router();

router.get('/', getUserFolders);
router.get('/create', getCreateFolder);
router.post('/create', postFolder);

router.get('/file/:fileId', getFileById);
router.delete('/file/:fileId/delete', deleteFileById);

router.get('/:folderId', getFolderById);
router.post('/:folderId/delete', postDeleteFolder);
router.post('/:folderId/update', updateFolder);
router.post('/:folderId/file', postFileToFolder);

export default router;
