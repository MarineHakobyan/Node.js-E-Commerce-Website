import express from 'express';
import { getRepository } from 'typeorm';
import { UserEntity } from '../orm/entities/userEntity';

const router = express.Router();

router.get('/users', async (req, res) => {
  const userRepository = getRepository(UserEntity);
  const users = await userRepository.find();
  res.json(users);
});

export { router as fetchUsersRouter };
