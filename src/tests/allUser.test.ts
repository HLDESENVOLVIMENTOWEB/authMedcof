import { prisma } from '../config/prisma';
import { all } from '../services/users/allUserService';


jest.mock('../config/prisma', () => ({
  prisma: {
    user: {
      findMany: jest.fn(),
    },
  },
}));

describe('all', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all users', async () => {
    // Mock the user data
    const usersData = [
      { id: 1, name: 'User 1', email: 'user1@example.com' },
      { id: 2, name: 'User 2', email: 'user2@example.com' },
    ];

    (prisma.user.findMany as jest.Mock).mockResolvedValue(usersData);

    const result = await all();

    expect(result).toEqual(usersData);

    expect(prisma.user.findMany).toHaveBeenCalled();
  });

  it('should throw an error if user retrieval fails', async () => {
    (prisma.user.findMany as jest.Mock).mockRejectedValue(new Error('User retrieval failed'));

    await expect(all()).rejects.toThrow('User retrieval failed');

    expect(prisma.user.findMany).toHaveBeenCalled();
  });
});
