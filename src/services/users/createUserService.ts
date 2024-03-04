import { prisma } from '../../config/prisma';

export async function createUser(name: string, email: string, hashedPassword: string) {
    try {
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });
      return user;
    } catch (error) {
      throw new Error('User creation failed');
    }
  }