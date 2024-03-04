import { Request, Response } from 'express';
import * as allUserService from '../../services/users/allUserService';
import { STATUS } from '../../utils/types';
import { winstonLogger } from '../../logger';

export async function all(req: Request, res: Response) {
  try {
    const users = await allUserService.all();
    winstonLogger.debug(users);
    res.status(STATUS.OK).json({ users });
  } catch (error: any) {
    winstonLogger.error(error.message);
    res.status(STATUS.ERROR).send(error.message);
  }
}