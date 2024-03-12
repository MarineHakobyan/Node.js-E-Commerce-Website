import express from 'express';
import { getRepository } from 'typeorm';
import { UserEntity } from '../orm/entities/userEntity';

const router = express.Router();

router.delete('/users/:userId', async (req, res) => {
  const { userId } = req.params;
  const userRepository = getRepository(UserEntity);
  const result = await userRepository.delete(userId);

  if (result.affected) {
    res.json({ message: 'User deleted successfully' });
  } else {
    res.json({ message: 'User not found or could not be deleted' });
  }
});

export { router as deleteUserRouter };
