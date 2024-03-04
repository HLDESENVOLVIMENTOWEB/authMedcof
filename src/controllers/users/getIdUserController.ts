import { Request, Response } from 'express';
import * as allUserService from '../../services/users/getIdUserService';
import { STATUS } from '../../utils/types';
import { winstonLogger } from '../../logger';

export async function getId(req: Request, res: Response) {
  try {
      const user = await allUserService.getId(Number(req.params.id));
      winstonLogger.debug(user);
      res.status(STATUS.OK).json({ user });
  } catch (error: any) {
      winstonLogger.error(error.message);
      res.status(STATUS.ERROR).send(error.message);
  }
}