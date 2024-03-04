import { prisma } from '../../config/prisma';

export async function getId(id:number) {
    try {
      const user = await prisma.user.findFirst({
        where: {
          id
        }
      })
      return user;
    } catch (error) {
      throw new Error('Users creation failed');
    }
  }