import express from 'express';
import { getRepository } from 'typeorm';
import { ProductEntity } from '../orm/entities/productEntity';

const router = express.Router();

router.get('/products', async (req, res) => {
  const productRepository = getRepository(ProductEntity);
  const products = await productRepository.find({ relations: ['user'] });
  res.json(products);
});

export { router as fetchProductsRouter };
