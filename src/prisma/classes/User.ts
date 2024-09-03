import { User } from '@prisma/client';
import prisma from '..';
import bcrypt, { genSaltSync } from 'bcryptjs';

class Users {
  static async findById(id: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  static async findByUsername(username: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        username,
      },
    });
  }

  static async signUp(userData: User) {
    const hash = bcrypt.hashSync(userData.password, genSaltSync());

    return await prisma.user.create({
      data: {
        ...userData,
        password: hash,
      },
    });
  }
}

export default Users;
