import * as express from 'express';
import { Request, Response } from 'express';

import {handleAsync, transformResponseBody} from '../common/helpers';
import { AuthController } from '../controllers/authController';
import { LoginDto, UserRegistrationDto } from '../dtos/user.input.dto';
import {
  registrationSchema,
  loginSchema,
  updatePasswordSchema,
} from '../schemas';
import { validateRequest } from '../middleware/validateInput';
import { jwtValidator } from '../middleware/jwtValidator';
import { TRequestWithToken } from '../common/types/user.types';
import {UserOutputDto} from "../dtos/user.output.dto";
import {UserLoginOutputDto} from "../dtos/user.login.output.dto";

const authController = new AuthController();
const AuthRouter = express.Router();

AuthRouter.post(
  '/auth/register',
  validateRequest(registrationSchema),
  handleAsync(async (req: Request, res: Response) => {
    const data = req.body as UserRegistrationDto;
    const result = await authController.register(data);

    res.status(201).send(transformResponseBody(UserOutputDto, result));
  }),
);

AuthRouter.post(
  '/auth/login',
  validateRequest(loginSchema),
  handleAsync(async (req: Request, res: Response) => {
    const loginDto = req.body as LoginDto;
    const result = await authController.login(loginDto);

    res.status(200).send(transformResponseBody(UserLoginOutputDto, result));
  }),
);

AuthRouter.put(
  '/auth/password',
  jwtValidator,
  validateRequest(updatePasswordSchema),
  handleAsync(
    async (req: TRequestWithToken, res: Response) => {
      const result = await authController.updatePassword(
        req.user.userId,
        req.body.oldPassword,
        req.body.newPassword,
      );

      res.status(200).send(transformResponseBody(UserOutputDto, result));
    },
  ),
);

export { AuthRouter };
