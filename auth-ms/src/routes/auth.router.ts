import * as express from 'express';
import { Request, Response } from 'express';

import { handleAsync } from '../common/helpers';
import { AuthController } from '../controllers/authController';
import {LoginDto, UpdatePasswordDto, UserRegistrationDto} from '../dtos/user.dto';
import {userRegistrationSchema, loginSchema, updatePasswordSchema} from '../schemas';
import { validateRequest } from '../middleware/validateInput';
import { jwtMiddleware } from '../middleware/jwt.middleware';

const authController = new AuthController();
const AuthRouter = express.Router();

AuthRouter.post(
  '/auth/register',
  validateRequest(userRegistrationSchema),
  handleAsync(async (req: Request, res: Response) => {
    try {
      const data = req.body as UserRegistrationDto;
      const result = await authController.register(data);

      res.status(201).json(result);
    } catch (error) {
      console.error(error);

      res.status(500).json({ error: 'Internal server error' });
    }
  }),
);

AuthRouter.post(
  '/auth/login',
  validateRequest(loginSchema),
  handleAsync(async (req: Request, res: Response) => {
    try {
      const loginDto = req.body as LoginDto;
      const result = await authController.login(loginDto);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(401).json({ error: 'Invalid username or password' });
    }
  }),
);

AuthRouter.put(
    '/auth/password',
    jwtMiddleware,
    validateRequest(updatePasswordSchema),
    handleAsync(async (req: Request, res: Response) => {
        try {
            const {oldPassword, newPassword, email} = req.body as UpdatePasswordDto;
            const result = await authController.updatePassword(req.body.userId, oldPassword, newPassword);

            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: 'Failed to update password' });
        }
    }),
);

export { AuthRouter };
