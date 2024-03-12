import express from 'express';
import { UserEntity } from '../orm/entities/userEntity';

const router = express.Router();

router.delete('/users/:userId', async (req, res) => {
  const { userId } = req.params;
  const result = await UserEntity.delete(userId);

  if (result.affected > 0) {
    res.json({ message: 'User deleted successfully' });
  } else {
    res.json({ message: 'User not found or could not be deleted' });
  }
});

export { router as deleteUserRouter };
