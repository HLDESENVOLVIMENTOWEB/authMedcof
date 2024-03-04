import { prisma } from '../config/prisma';
import { createUser } from '../services/users/createUserService';

// Mock the Prisma client
jest.mock('../config/prisma', () => ({
  prisma: {
    user: {
      create: jest.fn(),
    },
  },
}));

describe('createUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new user and return the user object', async () => {
    const userData = {
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
    };

    (prisma.user.create as jest.Mock).mockResolvedValue(userData);

    const result = await createUser('Test User', 'test@example.com', 'hashedPassword');

    expect(result).toEqual(userData);

    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        name: 'Test User',
        email: 'test@example.com',
        password: 'hashedPassword',
      },
    });
  });

  it('should throw an error if user creation fails', async () => {
    (prisma.user.create as jest.Mock).mockRejectedValue(new Error('User creation failed'));

    await expect(createUser('Test User', 'test@example.com', 'hashedPassword')).rejects.toThrow('User creation failed');

    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        name: 'Test User',
        email: 'test@example.com',
        password: 'hashedPassword',
      },
    });
  });
});
