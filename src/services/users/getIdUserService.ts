import { prisma } from '../../config/prisma';

export async function getId(id: number) {
  try {
      const user = await prisma.user.findFirst({
          where: {
              id
          }
      });

      if (!user) {
          throw new Error('User not found');
      }

      return user;
  } catch (error: any) {
      throw new Error('User retrieval failed: ' + error.message);
  }
}