import { handleAsync } from '../common/helpers';
import express, { Request, Response } from 'express';
import { AuthController } from '../controllers/authController';

const authController = new AuthController();
const AuthRouter = express.Router();

AuthRouter.post(
  '/auth/register',
  handleAsync(async (req: Request, res: Response) => {
    const result = await authController.register(req.body);
    res.json(result);
  }),
);

AuthRouter.post(
  '/auth/login',
  handleAsync(async (req: Request & any, res: Response) => {
    const result = await authController.login(req.user);
    res.json(result);
  }),
);

AuthRouter.post(
  '/auth/refresh-token',
  handleAsync(async (req: Request, res: Response) => {
    const result = await authController.refreshToken(req?.body.refreshToken);
    res.send(result);
  }),
);

export {AuthRouter};
