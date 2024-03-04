// tests/authService.test.js
const authService = require('../services/authService');
const bcrypt = require('bcryptjs');
const { prisma } = require('../config/prisma');

jest.mock('../config/prisma');
jest.mock('bcryptjs');

describe('authenticateUser', () => {
  it('should authenticate a user successfully', async () => {
    const mockUser = { id: 1, email: 'test@example.com', password: 'hashedpassword' };
    prisma.user.findUnique.mockResolvedValue(mockUser);
    bcrypt.compareSync.mockReturnValue(true);

    const user = await authService.authenticateUser('test@example.com', 'password');

    expect(user).toEqual(mockUser);
    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
    expect(bcrypt.compareSync).toHaveBeenCalledWith('password', 'hashedpassword');
  });

  it('should throw an error if authentication fails', async () => {
    prisma.user.findUnique.mockResolvedValue(null);

    await expect(authService.authenticateUser('test@example.com', 'password'))
      .rejects.toThrow('Authentication failed');
  });
});
