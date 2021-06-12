import { Router } from 'express';
import {userController} from '../../controller';
import {checkIsEmailExistsMiddleware} from '../../middlewares';

const router = Router();

router.post('/', checkIsEmailExistsMiddleware, userController.createUser);

export const userRouter = router;
