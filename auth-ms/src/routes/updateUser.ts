import express from 'express';
import { getRepository } from 'typeorm';
import { UserEntity } from '../orm/entities/userEntity';

const router = express.Router();

router.put('/users/:userId', async (req, res) => {
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

export { router as updateUserRouter };
