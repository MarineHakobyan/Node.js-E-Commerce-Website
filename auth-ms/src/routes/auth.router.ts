import * as express from 'express';
import { NextFunction, Request, Response } from 'express';

import { handleAsync } from '../common/helpers';
import { AuthController } from '../controllers/authController';
import {
  LoginDto,
  UpdatePasswordDto,
  UserRegistrationDto,
} from '../dtos/user.dto';
import {
  userRegistrationSchema,
  loginSchema,
  updatePasswordSchema,
} from '../schemas';
import { validateRequest } from '../middleware/validateInput';
import { jwtMiddleware } from '../middleware/jwt.middleware';
import { TRequestWithToken } from '../common/types/user.types';

const authController = new AuthController();
const AuthRouter = express.Router();

AuthRouter.post(
  '/auth/register',
  validateRequest(userRegistrationSchema),
  handleAsync(async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body as UserRegistrationDto;
    const result = await authController.register(data);

    res.status(201).json(result);
  }),
);

AuthRouter.post(
  '/auth/login',
  validateRequest(loginSchema),
  handleAsync(async (req: Request, res: Response) => {
    const loginDto = req.body as LoginDto;
    const result = await authController.login(loginDto);
    res.status(200).json(result);
  }),
);

AuthRouter.put(
  '/auth/password',
  jwtMiddleware,
  validateRequest(updatePasswordSchema),
  handleAsync(
    async (req: TRequestWithToken, res: Response, next: NextFunction) => {
      const result = await authController.updatePassword(
        req.user.userId,
        req.body.oldPassword,
        req.body.newPassword,
      );
      const { password, ...data } = result;

      res.status(200).json(data);
    },
  ),
);

export { AuthRouter };
