import { User } from '@prisma/client';
import prisma from '..';
import bcrypt from 'bcryptjs';
import { UserWithFolders } from '../models';

class Users {
  static findById(id: string): Promise<UserWithFolders | null> {
    return prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        Folder: true,
      },
    });
  }

  static findByUsername(username: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        username,
      },
    });
  }

  static findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  static signUp(userData: User): Promise<User> {
    const hash = bcrypt.hashSync(userData.password, bcrypt.genSaltSync());

    return prisma.user.create({
      data: {
        ...userData,
        password: hash,
      },
    });
  }
}

export default Users;
