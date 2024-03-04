import { prisma } from '../config/prisma';
import { getId } from '../services/users/getIdUserService';

jest.mock('../config/prisma', () => ({
  prisma: {
    user: {
      findFirst: jest.fn(),
    },
  },
}));

describe('getId', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return a user by their ID', async () => {
    // Mock the user data
    const userId = 1;
    const userData = { id: userId, name: 'Test User', email: 'test@example.com' };

    // Mock the Prisma user findFirst method to resolve with user data
    (prisma.user.findFirst as jest.Mock).mockResolvedValue(userData);

    // Call the getId function with a user ID
    const result = await getId(userId);

    // Assert that the result matches the expected user data
    expect(result).toEqual(userData);

    // Assert that the Prisma user findFirst method was called with the correct parameters
    expect(prisma.user.findFirst).toHaveBeenCalledWith({
      where: { id: userId },
    });
  });

  it('should throw an error if user retrieval fails', async () => {
    // Mock the Prisma user findFirst method to throw an error
    (prisma.user.findFirst as jest.Mock).mockRejectedValue(new Error('User retrieval failed'));

    // Call the getId function and expect it to throw an error
    await expect(getId(1)).rejects.toThrow('User retrieval failed');

    // Assert that the Prisma user findFirst method was called with the correct parameters
    expect(prisma.user.findFirst).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });
});
