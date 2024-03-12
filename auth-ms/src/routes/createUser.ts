import express from 'express';
import { UserEntity } from '../orm/entities/userEntity';

const router = express.Router();

router.post('/users', async (req, res) => {
  const user = await UserEntity.create(req.body);
  await user.save();
  res.json(user);
});

export { router as createUserRouter };
