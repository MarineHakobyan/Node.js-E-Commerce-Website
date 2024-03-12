import express from 'express';
import { getRepository } from 'typeorm';
import { UserEntity } from '../orm/entities/userEntity';

const router = express.Router();

router.post('/users', async (req, res) => {
  const userRepository = getRepository(UserEntity);
  const user = userRepository.create(req.body);
  await userRepository.save(user);
  res.json(user);
});

export { router as createUserRouter };
