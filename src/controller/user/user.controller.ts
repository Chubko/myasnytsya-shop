import {NextFunction, Request, Response} from 'express';

import {emailService, userService} from '../../services';
import {newUserValidator} from '../../validators';
import {IUser} from '../../models';
import {hashPassword} from '../../helpers';
import {ActionEnum} from '../../constants';

class UserController {
  async createUser(req: Request, res: Response, next: NextFunction) {
    const user = req.body as IUser;

    const {error} = newUserValidator.validate(user);

    if (error) {
      return next(new Error(error.details[0].message));
    }

    user.password = await hashPassword(user.password);

    await userService.createUser(user);

    await emailService.sendEmail(user.email,ActionEnum.USER_REGISTER, {token:'xxx'});
    res.sendStatus(201);

  }
}

export const userController = new UserController();
