import express, { Request, Response } from 'express';
import { handleAsync } from '../common/helpers';
import { UserController } from '../controllers/user.controller';
import { jwtValidator } from '../middleware/jwtValidator';
import { UserUpdateOptionalDataDto } from '../dtos';
import {
  TRequestWithToken,
  TUpdateUserRequest,
  TUserTokenDecoded,
} from '../common/types/user.types';
import { validateRequest } from '../middleware/validateInput';
import { userUpdateOptionalSchema, userUpdateAllSchema } from '../schemas';

const userController = new UserController();
const UserRouter = express.Router();

UserRouter.get(
  '/user',
  jwtValidator,
  handleAsync(async (req: TRequestWithToken, res: Response) => {
    const userId = req.user.userId;
    const user = await userController.getOne(userId);

    res.send(user);
  }),
);

UserRouter.put(
  '/user',
  jwtValidator,
  validateRequest(userUpdateAllSchema),
  handleAsync(async (req: TUpdateUserRequest, res: Response) => {
    const updatedUser = await userController.updateOne(
      req.user.userId,
      req.body,
    );

    res
      .status(200)
      .json({ message: 'UserEntity updated successfully', user: updatedUser });
  }),
);

UserRouter.patch(
  '/user',
  jwtValidator,
  validateRequest(userUpdateOptionalSchema),
  handleAsync(async (req: TRequestWithToken, res: Response) => {
    const data = req.body as UserUpdateOptionalDataDto;
    const userId = req.user.userId;

    await userController.updateOne(userId, data);

    return res.status(200).send({message:'UserEntity Updated'});
  }),
);

UserRouter.delete(
  '/user',
  jwtValidator,
  handleAsync(async (req: TRequestWithToken, res: Response) => {
    const userId = req.user.userId;

    const isDeleted = await userController.deleteOne(userId);

    if (isDeleted) {
      res.status(200).send({message:'UserEntity deleted'});
    }

    throw new Error('Failed to delete');
  }),
);

export { UserRouter };
