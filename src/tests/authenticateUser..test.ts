// Import necessary libraries and types
import bcrypt from 'bcryptjs';
import { prisma } from '../config/prisma';
import { authenticateUser } from '../services/authService';

// Mock bcrypt compareSync function
jest.mock('bcryptjs', () => ({
  compareSync: jest.fn(),
}));

describe('authenticateUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should authenticate a user successfully', async () => {
    const userData = {
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      password: 'hashedpassword', 
    };

    prisma.user.findUnique = jest.fn().mockResolvedValue(userData);

    (bcrypt.compareSync as jest.Mock).mockReturnValue(true);

    const user = await authenticateUser('test@example.com', 'password');

    expect(user).toEqual(userData);

    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });

    expect(bcrypt.compareSync).toHaveBeenCalledWith('password', userData.password);
  });
});
