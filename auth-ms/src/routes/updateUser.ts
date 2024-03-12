import express from 'express';
import { UserEntity } from '../orm/entities/userEntity';

const router = express.Router();

router.put('/users/:userId', async (req, res) => {
  const { userId } = req.params;
  const updatedUser = await UserEntity.update(userId, req.body);

  if (updatedUser.affected > 0) {
    const user = await UserEntity.findOne(userId);
    res.json(user);
  } else {
    res.json({ message: 'User not found or could not be updated' });
  }
});

export { router as updateUserRouter };
