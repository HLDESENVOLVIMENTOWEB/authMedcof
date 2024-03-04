import { Request, Response } from 'express';
import * as authService from '../services/authService';
import { generateToken } from '../utils/jwtHelper';
import { STATUS } from '../utils/types';


export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user = await authService.authenticateUser(email, password);
    const token = generateToken(user.id);
    res.status(STATUS.OK).json({ token });
  } catch (error) {
    res.status(STATUS.FORBIDDEN).send(error);
  }
}