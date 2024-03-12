import express from 'express';
import { UserEntity } from '../orm/entities/userEntity';
import { ProductEntity } from '../orm/entities/productEntity';

const router = express.Router();

router.post('/products', async (req, res) => {
  const { userId, ...productData } = req.body;

  const user = await UserEntity.findOne(userId);

  if (!user) {
    return res.json({ message: 'User not found' });
  }

  const product = ProductEntity.create(productData);
  product.user = user;
  await product.save();

  res.json(product);
});

export { router as createProductRouter };
