// Import necessary libraries and types
import bcrypt from 'bcryptjs';
import { prisma } from '../config/prisma';

// Define the User type
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

export async function authenticateUser(email: string, password: string) {
  try {
    // Explicitly specify the return type of prisma.user.findUnique
    const user: User | null = await prisma.user.findUnique({ where: { email } });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new Error('Authentication failed');
    }
    return user;
  } catch (error) {
    throw new Error('Authentication failed');
  }
}
