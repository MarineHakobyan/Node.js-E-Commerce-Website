import express, {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from 'express';
import { getRepository } from 'typeorm';
import { UserEntity } from '../orm/entities/userEntity';
import { router, validateUserId } from '../middleware/userAuth.middleware';
import { userService } from '../services/user.service';

export const UserRouter = express.Router();

UserRouter.get('/users', async (req, res) => {
  const userRepository = getRepository(UserEntity);
  const users = await userRepository.find();
  res.json(
    users.map((user) => {
      const { password, ...data } = user;
      return data;
    }),
  );
});

UserRouter.get(
  '/users/:id',
  validateUserId as unknown as RequestHandler,
  async (req: Request & { userId?: number }, res: Response): Promise<void> => {
    try {
      const { password, ...user } = await userService.getOneByData({
        id: req.userId as number,
      });

      res.json(user);
    } catch (error) {
      const statusCode = error.statusCode || 500;

      res
        .status(statusCode)
        .send(statusCode ? error.message : 'Internal server error');
    }
  },
);

UserRouter.put('/users/:userId', async (req, res) => {
  const { userId } = req.params;
  const userRepository = getRepository(UserEntity);

  try {
    await userRepository.update(userId, req.body);

    const user = await userRepository.findOne(userId);

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating user' });
  }
});

router.delete(
  '/users/:userId',
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    const userRepository = getRepository(UserEntity);
    const result = await userRepository.delete(userId);

    if (result.affected) {
      res.json({ message: 'User deleted successfully.' });
    } else {
      next(new Error('User not found or could not be deleted.'));
    }
  },
);

//     put@ sax update any by id, patch@ miayn en colum@ vor petqa,
