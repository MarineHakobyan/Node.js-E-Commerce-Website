import express, { Request, Response } from 'express';
import { handleAsync } from '../common/helpers';
import { UserController } from '../controllers/user.controller';

const userController = new UserController();
const UserRouter = express.Router();

UserRouter.get(
  '/users/:id',
  handleAsync(async (req: Request, res: Response) => {
    const data = { userId: parseInt(req.params.id, 10) };
    return await userController.getOne(data);
  }),
);

UserRouter.put(
  '/users/:id',
  handleAsync(async (req: Request, res: Response) => {
    const data = { userId: parseInt(req.params.id, 10), userData: req.body };
    return await userController.update(data);
  }),
);

UserRouter.patch(
  '/users/:id',
  handleAsync(async (req: Request, res: Response) => {
    const data = { userId: parseInt(req.params.id, 10), userData: req.body };
    return await userController.updateOne(data);
  }),
);

UserRouter.delete(
  '/users/:id',
  handleAsync(async (req: Request, res: Response) => {
    const data = { userId: parseInt(req.params.id, 10) };
    return await userController.delete(data);
  }),
);

export { UserRouter };
