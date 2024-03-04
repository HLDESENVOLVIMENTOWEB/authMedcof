import { Request, Response } from 'express';
import * as allUserService from '../../services/users/allUserService';
import { STATUS } from '../../utils/types';

export async function all(req: Request, res: Response) {
  try {
    const users = await allUserService.all();
    console.log(users)
    res.status(STATUS.OK).json({ users });
  } catch (error) {
    res.status(STATUS.ERROR).send(error);
  }
}