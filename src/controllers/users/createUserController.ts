import { Request, Response } from 'express';
import * as authService from '../../services/users/createUserService';
import { generateToken } from '../../utils/jwtHelper';
import bcrypt from 'bcryptjs';
import { STATUS } from '../../utils/types';
import { winstonLogger } from '../../logger';

export async function register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const hashedPassword = bcrypt.hashSync(password, 8); // Hash the password
      const user = await authService.createUser(name, email, hashedPassword);
      const token = generateToken(user.id); 
      winstonLogger.debug(user);
      res.status(STATUS.OK).json({ user, token });
    } catch (error) {
      winstonLogger.error(error);
      res.status(STATUS.ERROR).send(error);
    }
  }