import express from 'express';
import { UserEntity } from '../orm/entities/userEntity';

const router = express.Router();

router.get('/users', async (req, res) => {
  const users = await UserEntity.find();
  res.json(users);
});

export { router as fetchUsersRouter };
