import express, { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { ProductEntity } from '../orm/entities/productEntity';

const router = express.Router();

router.delete(
  '/products/:productId',
  async (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.params;
    const productRepository = getRepository(ProductEntity);
    const result = await productRepository.delete(productId);

    if (result.affected) {
      res.json({ message: 'Product deleted successfully.' });
    } else {
      next(new Error('Product not found or could not be deleted.'));
    }
  },
);

export { router as deleteProductRouter };
