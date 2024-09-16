import { UserWithFolders } from '@/prisma/models';
import { Folder } from '@prisma/client';
import { Request } from 'express';

const isFolderOwner = (req: Request): boolean =>
  !!(req.user as UserWithFolders).Folder.find((folder: Folder) => folder.id === req.params.folderId);

export default isFolderOwner;
