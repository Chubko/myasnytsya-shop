import {NextFunction, Request, Response} from 'express';
import {userService} from '../../services';

class UserController {
  async createUser(req: Request, res: Response, next: NextFunction) {
    const user = req.body;

    // todo validate user
    // todo hash password

    await userService.createUser(user);

  }
}

export const userController = new UserController();
