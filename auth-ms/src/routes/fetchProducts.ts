import express from 'express';
import { ProductEntity } from '../orm/entities/productEntity';

const router = express.Router();

router.get('/products', async (req, res) => {
  const products = await ProductEntity.find({ relations: ['user'] });
  res.json(products);
});

export { router as fetchProductsRouter };
