import { Request, Response } from 'express';
import * as authService from '../services/authService';
import { generateToken } from '../utils/jwtHelper';
import { STATUS } from '../utils/types';
import { winstonLogger } from '../logger';

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user = await authService.authenticateUser(email, password);
    const token = generateToken(user.id);
    winstonLogger.debug(token);
    res.status(STATUS.OK).json({ token });
  } catch (error: any) {
    winstonLogger.error(error.message);
    res.status(STATUS.FORBIDDEN).json({ error: error.message });
  }
}
