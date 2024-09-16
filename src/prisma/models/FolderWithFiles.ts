import { Prisma } from '@prisma/client';

type FolderWithFiles = Prisma.FolderGetPayload<{
  include: {
    File: true;
  };
}>;

export default FolderWithFiles;
