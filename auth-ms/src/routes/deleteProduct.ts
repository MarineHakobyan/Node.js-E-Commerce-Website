import express from 'express';
import {ProductEntity} from "../orm/entities/productEntity";

const router = express.Router();

router.delete('/products/:productId', async (req, res) => {
  const { productId } = req.params;
  const result = await ProductEntity.delete(productId);

  if (result.affected > 0) {
    res.json({ message: 'Product deleted successfully' });
  } else {
    res.json({ message: 'Product not found or could not be deleted' });
  }
});

export { router as deleteProductRouter };
