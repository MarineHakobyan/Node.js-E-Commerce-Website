import { Router, Request, Response, NextFunction } from 'express';

import { ProductService } from '../services/product.service';
import { ProductController } from '../controllers/product.controller';
import { jwtValidator } from '../middleware/jwtValidator';
import { validateProductId } from '../middleware/userAuth.middleware';

const productService = new ProductService();
const productController = new ProductController(productService);

const ProductRouter = Router();

ProductRouter.post(
  '/products',
  jwtValidator,
  validateProductId,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId, ...productData } = req.body;
      const product = await productController.createProduct(productData);
      res.json(product);
    } catch (error) {
      next(error); // Pass error to middleware for handling
    }
  },
);

ProductRouter.get(
  '/products',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await productController.getAllProducts();
      res.json(products);
    } catch (error) {
      next(error);
    }
  },
);

ProductRouter.put(
  '/products/:productId',
  async (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.params;
    const productData = req.body;

    try {
      const product = await productController.updateProduct(
        productId,
        productData,
      );
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      next(error);
    }
  },
);

ProductRouter.delete(
  '/products/:productId',
  async (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.params;
    await productController.deleteProduct(productId);
    res.json({ message: 'Product deleted' });
  },
);

export { ProductRouter };
