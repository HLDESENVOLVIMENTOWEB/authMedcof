import { Request, Response } from 'express';
import * as allUserService from '../../services/users/getIdUserService';
import { STATUS } from '../../utils/types';

  export async function getId(req: Request, res: Response) {
    try {
      const user = await allUserService.getId(Number(req.params.id));
      res.status(STATUS.OK).json({ user });
    } catch (error) {
      res.status(STATUS.ERROR).send(error);
    }
  }