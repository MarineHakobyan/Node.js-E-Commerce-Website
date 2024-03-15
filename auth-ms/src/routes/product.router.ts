import { Router, Request, Response, NextFunction } from 'express';

import { ProductController } from '../controllers/product.controller';
import { jwtValidator } from '../middleware/jwtValidator';
import { transformProductId } from '../middleware/product.middleware';
import {TReqWithProductId, TReqWithProductPayload} from "../common/types/product.types";

const productController = new ProductController();

const ProductRouter = Router();

ProductRouter.post(
  '/products',
  jwtValidator,
  transformProductId,
  async (req: TReqWithProductId, res: Response, next: NextFunction) => {
    try {
      const { userId, ...productData } = req.body;
      const product = await productController.createProduct(userId, productData);

      res.json(product);
    } catch (error) {
      next(error);
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
  transformProductId,
  async (req: TReqWithProductPayload, res: Response, next: NextFunction) => {
    const { productId, payload } = req;

    try {
      const product = await productController.updateProduct(productId, payload);
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
  async (req: TReqWithProductId, res: Response, next: NextFunction) => {
    await productController.deleteProduct(req.productId);
    res.json({ message: 'Product deleted' });
  },
);

export { ProductRouter };
