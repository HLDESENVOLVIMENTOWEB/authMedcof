import { prisma } from '../../config/prisma';

export async function all() {
    try {
      const users = await prisma.user.findMany()
      console.log(users)
      return users;
    } catch (error) {
      throw new Error('Users creation failed');
    }
  }