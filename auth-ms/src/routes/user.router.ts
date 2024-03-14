import express, { Request, Response } from 'express';
import { handleAsync } from '../common/helpers';
import { UserController } from '../controllers/user.controller';
import { jwtMiddleware } from '../middleware/jwt.middleware';
import { UserUpdateOptionalDataDto } from '../dtos';
import {
    TRequestWithToken, TUpdateUserRequest,
    TUserTokenDecoded,
} from '../common/types/user.types';
import {validateRequest} from "../middleware/validateInput";
import {userUpdateOptionalSchema, userUpdateAllSchema} from "../schemas";

const userController = new UserController();
const UserRouter = express.Router();

UserRouter.get(
    '/user',
    jwtMiddleware,
    handleAsync(async (req: TRequestWithToken, res: Response) => {
        const userId = req.user.userId;
        const user = await userController.getOne(userId);

        res.send(user);
    }),
);

UserRouter.put(
  '/user',
  jwtMiddleware,
  validateRequest(userUpdateAllSchema),
  handleAsync(async (req: TUpdateUserRequest, res: Response) => {
    const updatedUser = await userController.updateOne(req.user.userId, req.body);

    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  }),
);

UserRouter.patch(
  '/user',
  jwtMiddleware,
  validateRequest(userUpdateOptionalSchema),
  handleAsync(async (req: TRequestWithToken, res: Response) => {
    const data = req.body as UserUpdateOptionalDataDto;
    const userId = req.user.userId;

    await userController.updateOne(userId, data);

    return res.status(200).send('User Updated')
  }),
);

UserRouter.delete(
  '/user',
  jwtMiddleware,
  handleAsync(async (req: TRequestWithToken, res: Response) => {
    const userId = req.user.userId;

    const isDeleted = await userController.deleteOne(userId);

    if(isDeleted) {
        res.status(200).send('User deleted')
    }

    throw new Error('Failed to delete')
  }),
);

export { UserRouter };
