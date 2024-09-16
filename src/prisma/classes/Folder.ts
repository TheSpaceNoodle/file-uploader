import { Folder } from '@prisma/client';
import prisma from '..';
import FolderWithFiles from '../models/FolderWithFiles';

class Folders {
  static getUserFolders(userId: string): Promise<Folder[]> {
    return prisma.folder.findMany({
      where: {
        ownerId: userId,
      },
    });
  }

  static getFolderById(folderId: string): Promise<FolderWithFiles | null> {
    return prisma.folder.findUnique({
      where: {
        id: folderId,
      },
      include: {
        File: true,
      },
    });
  }

  static createFolder(name: string, ownerId: string): Promise<Folder> {
    return prisma.folder.create({
      data: {
        name,
        ownerId,
      },
    });
  }

  static updateFolderName(id: string, name: string): Promise<Folder> {
    return prisma.folder.update({
      where: {
        id,
      },
      data: {
        name,
      },
      include: {
        File: true,
      },
    });
  }

  static deleteFolder(id: string): Promise<Folder | Error> {
    return prisma.file
      .deleteMany({
        where: {
          folderId: id,
        },
      })
      .then(() =>
        prisma.folder.delete({
          where: {
            id,
          },
        }),
      );
  }
}

export default Folders;
