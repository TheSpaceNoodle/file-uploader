import { Prisma } from '@prisma/client';

interface UserWithFolders
  extends Prisma.UserGetPayload<{
    include: {
      Folder: true;
    };
  }> {
  full_name: string;
}

export default UserWithFolders;
