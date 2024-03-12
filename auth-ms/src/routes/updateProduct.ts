import express from 'express';
import { ProductEntity } from '../orm/entities/productEntity';

const router = express.Router();

router.put('/products/:productId', async (req, res) => {
  const { productId } = req.params;
  const updatedProduct = await ProductEntity.update(productId, req.body);

  if (updatedProduct.affected > 0) {
    const product = await ProductEntity.findOne(productId, {
      relations: ['user'],
    });
    res.json(product);
  } else {
    res.json({ message: 'Product not found or could not be updated' });
  }
});

export { router as updateProductRouter };
