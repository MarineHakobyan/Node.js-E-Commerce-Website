import express, { Response } from 'express';

import { handleAsync, transformResponseBody } from '../common/helpers';
import { UserController } from '../controllers/user.controller';
import { jwtValidator } from '../middleware/jwtValidator';
import { UserUpdateOptionalDataDto } from '../dtos';
import {
    TRequestWithToken, TRequestWithUserId,
    TUpdateUserRequest,
} from '../common/types/user.types';
import { validateRequest } from '../middleware/validateInput';
import { userUpdateOptionalSchema, userUpdateAllSchema } from '../schemas';
import { UserOutputDto } from '../dtos/user.output.dto';
import {parseUserIdParam} from "../middleware/parseUserIdParam";

const userController = new UserController();
const UserRouter = express.Router();

UserRouter.get(
  '/user/:id',
  jwtValidator,
  parseUserIdParam,
  handleAsync(async (req: TRequestWithUserId, res: Response) => {
    const userId = req.userId;

      console.log({userId})
    // const user = await userController.getOne(userId);
    // const data = transformResponseBody(UserOutputDto, user);

    throw new Error('topolya~')
    // res.status(200).send({ data });
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
    const data = transformResponseBody(UserOutputDto, updatedUser);

    res.status(200).send({ data, message: 'UserEntity updated successfully' });
  }),
);

UserRouter.patch(
  '/user',
  jwtValidator,
  validateRequest(userUpdateOptionalSchema),
  handleAsync(async (req: TRequestWithToken, res: Response) => {
    const payload = req.body as UserUpdateOptionalDataDto;
    const userId = req.user.userId;

    const updatedUser = await userController.updateOne(userId, payload);
    const data = transformResponseBody(UserOutputDto, updatedUser);

    return res.status(200).send({ data, message: 'UserEntity Updated' });
  }),
);

UserRouter.delete(
  '/user',
  jwtValidator,
  handleAsync(async (req: TRequestWithToken, res: Response) => {
    const userId = req.user.userId;

    const isDeleted = await userController.deleteOne(userId);

    if (isDeleted) {
      res.status(200).send({ message: 'UserEntity deleted' });
    }

    throw new Error('Failed to delete');
  }),
);

export { UserRouter };
