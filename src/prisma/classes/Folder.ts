import { File, Folder } from '@prisma/client';
import prisma from '@/prisma/index.ts';
import FolderWithFiles from '../models/FolderWithFiles.ts';
import bucket from '../bucket.ts';

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

  static async uploadFile(file: Express.Multer.File | undefined, folderId: string) {
    if (!file) {
      throw new Error('broken file');
    }

    const { data, error } = await bucket.storage
      .from('file-uploader')
      .upload(folderId + file.originalname + new Date().toString(), file.buffer, {});

    if (error) {
      return console.log('error', error);
    }

    await prisma.file.create({
      data: { fileUrl: data.path, size: file.size, name: file.originalname, folderId },
    });
  }

  static async downloadFile(fileId: string): Promise<string | null> {
    const file: File | null = await prisma.file.findUnique({
      where: {
        id: fileId,
      },
    });

    if (!file) {
      console.log('problem with file url');
      return null;
    }

    const { data } = await bucket.storage.from('file-uploader').createSignedUrl(file.fileUrl, 60);

    if (!data?.signedUrl) {
      console.log('problem with file');
      return null;
    }

    return data.signedUrl;
  }

  static async deleteFileById(fileId: string) {
    const file: File | null = await prisma.file.findUnique({
      where: {
        id: fileId,
      },
    });

    if (!file) {
      console.log('problem with file url');
      return null;
    }

    await bucket.storage.from('file-uploader').remove([file.fileUrl]);
    await prisma.file.delete({
      where: {
        id: fileId,
      },
    });
  }

  static shareFolder(folderId: string, duration: Date) {
    return prisma.folder.update({
      where: {
        id: folderId,
      },
      data: {
        isPublic: true,
        sharedUntil: duration,
      },
    });
  }

  static unshareFolder(folderId: string) {
    return prisma.folder.update({
      where: {
        id: folderId,
      },
      data: {
        isPublic: false,
        sharedUntil: null,
      },
    });
  }
}

export default Folders;
