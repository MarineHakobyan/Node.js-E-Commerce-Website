import express from 'express';
import { getRepository } from 'typeorm';
import { ProductEntity } from '../orm/entities/productEntity';

const router = express.Router();

router.put('/products/:productId', async (req, res) => {
  const { productId } = req.params;
  const productRepository = getRepository(ProductEntity);

  try {
    await productRepository.update(productId, req.body);

    const product = await productRepository.findOne(productId, {
      relations: ['user'],
    });

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating product' });
  }
});

export { router as updateProductRouter };
