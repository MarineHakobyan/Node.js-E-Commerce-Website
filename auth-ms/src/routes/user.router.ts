import express, { Request, Response } from 'express';
import { handleAsync } from '../common/helpers';
import { UserController } from '../controllers/user.controller';
import { jwtMiddleware } from '../middleware/jwt.middleware';
import { UserUpdatableOptionalDataDto } from '../dtos';

const userController = new UserController();
const UserRouter = express.Router();

UserRouter.get(
  '/users/:id',
  jwtMiddleware,
  handleAsync(async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id, 10);

    return await userController.getOne(userId);
  }),
);

UserRouter.put(
  '/users/:id',
  jwtMiddleware,
  handleAsync(async (req: Request, res: Response) => {
    const data = req.body as UserUpdatableOptionalDataDto;
    const userId = req.body.userId;

    return await userController.updateOne(userId, data);
  }),
);

UserRouter.patch(
  '/users/:id',
  jwtMiddleware,
  handleAsync(async (req: Request, res: Response) => {
    const data = req.body as UserUpdatableOptionalDataDto;
    const userId = req.body.userId;

    return await userController.updateOne(userId, data);
  }),
);

UserRouter.delete(
  '/users/:id',
  jwtMiddleware,
  handleAsync(async (req: Request, res: Response) => {
    const userId = parseInt(req.body.userId, 10);

    return await userController.deleteOne(userId);
  }),
);

export { UserRouter };
