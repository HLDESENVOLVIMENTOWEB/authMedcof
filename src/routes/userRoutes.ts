import { Router } from 'express';
import * as createController from '../controllers/users/createUserController';
import * as allUserController from '../controllers/users/allUserController';
import * as getIdUserController from '../controllers/users/getIdUserController';

const router = Router();

router.get('/all', allUserController.all);
router.post('/create', createController.register);
router.get('/get/:id', getIdUserController.getId);


export default router;