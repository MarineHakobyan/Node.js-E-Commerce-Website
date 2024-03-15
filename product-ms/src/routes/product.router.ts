import { Router, Request, Response, NextFunction } from 'express';

import { ProductController } from '../controllers/product.controller';
import { jwtValidator } from '../middleware/jwtValidator';
import { parseProductIdParam } from '../middleware/product.middleware';
import {
  TReqWithProductId,
  TReqWithProductPayloadAndId,
} from '../common/types/product.types';
import { validateRequest } from '../middleware/validateInput';
import { createProductSchema } from '../schemas/createProduct.schema';
import { TRequestWithToken } from '../common/types/user.types';
import { addToCartSchema } from '../schemas/addToCart.schema';

const productController = new ProductController();

const ProductRouter = Router();

ProductRouter.post(
  '/products',
  jwtValidator,
  validateRequest(createProductSchema),
  async (req: TReqWithProductId, res: Response, next: NextFunction) => {
    try {
      const userId = req.user.userId;
      const product = await productController.createProduct(userId, req.body);

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

ProductRouter.post(
  // here
  '/cart',
  validateRequest(addToCartSchema),
  jwtValidator,
  async (req: TReqWithProductId, res: Response, next: NextFunction) => {
    try {
      const userId = req.user.userId;
      const products = await productController.addToCart(userId, req.productId);

      res.json(products);
    } catch (error) {
      next(error);
    }
  },
);

ProductRouter.get(
  '/cart', // here
  jwtValidator,
  async (req: TRequestWithToken, res: Response, next: NextFunction) => {
    try {
      const userId = req.user.userId;
      const products = await productController.getCart(userId);

      res.json(products);
    } catch (error) {
      next(error);
    }
  },
);

ProductRouter.delete(
  // here
  '/cart',
  jwtValidator,
  parseProductIdParam,
  async (req: TReqWithProductId, res: Response, next: NextFunction) => {
    try {
      const userId = req.user.userId;
      await productController.deleteFromCart(userId, req.productId);

      res.json(200).send({ message: 'Item removed from cart' });
    } catch (error) {
      next(error);
    }
  },
);

ProductRouter.get(
  '/products/:id', // here
  jwtValidator,
  parseProductIdParam,
  async (req: TReqWithProductId, res: Response, next: NextFunction) => {
    try {
      const userId = req.user.userId;
      const productId = req.productId;
      const products = await productController.getOne(productId, userId);

      res.send(products);
    } catch (error) {
      next(error);
    }
  },
);

ProductRouter.put(
  '/products/:id',
  jwtValidator,
  parseProductIdParam,
  validateRequest(createProductSchema),
  async (
    req: TReqWithProductPayloadAndId,
    res: Response,
    next: NextFunction,
  ) => {
    const { productId, body } = req;
    try {
      const product = await productController.updateProduct(
        req.user.userId,
        productId,
        body,
      );

      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ message: 'ProductEntity not found' });
      }
    } catch (error) {
      next(error);
    }
  },
);

ProductRouter.delete(
  '/products/:id',
  jwtValidator,
  parseProductIdParam,
  async (req: TReqWithProductId, res: Response, next: NextFunction) => {
    await productController.deleteProduct(req.user.userId, req.productId);

    res.json({ message: 'ProductEntity deleted' });
  },
);

export { ProductRouter };
