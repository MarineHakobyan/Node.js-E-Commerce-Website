import express from 'express';
import { getRepository } from 'typeorm';
import { ProductEntity } from '../orm/entities/productEntity';

const router = express.Router();

router.delete('/products/:productId', async (req, res) => {
  const { productId } = req.params;
  const productRepository = getRepository(ProductEntity);
  const result = await productRepository.delete(productId);

  if (result.affected) {
    res.json({ message: 'Product deleted successfully' });
  } else {
    res.json({ message: 'Product not found or could not be deleted' });
  }
});

export { router as deleteProductRouter };
