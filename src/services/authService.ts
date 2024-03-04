import { prisma } from '../config/prisma';
import bcrypt from 'bcryptjs';

export async function authenticateUser(email: string, password: string) {
  try {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw new Error('Authentication failed');
  }
  return user;
} catch (error) {
  throw new Error('as failed');
}
}