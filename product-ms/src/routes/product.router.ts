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
import { transformResponseBody } from '../common/helpers';
import { ProductOutputDto } from '../dtos';
import { handleAsync } from '../common/helpers';

const productController = new ProductController();

const ProductRouter = Router();

ProductRouter.post(
  '/products',
  jwtValidator,
  validateRequest(createProductSchema),
  handleAsync(
    async (req: TReqWithProductId, res: Response, next: NextFunction) => {
      const userId = req.user.userId;
      const product = await productController.createProduct(userId, req.body);

      res.status(200).send(transformResponseBody(ProductOutputDto, product));
    },
  ),
);

ProductRouter.get(
  '/products',
  handleAsync(async (req: Request, res: Response, next: NextFunction) => {
    const products = await productController.getAllProducts();

    res.status(200).send(transformResponseBody(ProductOutputDto, products));
  }),
);

ProductRouter.get(
  '/products/:id',
  jwtValidator,
  parseProductIdParam,
  handleAsync(
    async (req: TReqWithProductId, res: Response, next: NextFunction) => {
      const userId = req.user.userId;
      const productId = req.productId;
      const product = await productController.getOne(productId, userId);

      res.status(200).send(transformResponseBody(ProductOutputDto, product));
    },
  ),
);

ProductRouter.put(
  '/products/:id',
  jwtValidator,
  parseProductIdParam,
  validateRequest(createProductSchema),
  handleAsync(
    async (
      req: TReqWithProductPayloadAndId,
      res: Response,
      next: NextFunction,
    ) => {
      const { productId, body } = req;
      const product = await productController.updateProduct(
        req.user.userId,
        productId,
        body,
      );

      if (product) {
        return res
          .status(200)
          .send(transformResponseBody(ProductOutputDto, product));
      }

      res.status(404).send({ message: 'Product not found' });
    },
  ),
);

ProductRouter.delete(
  '/products/:id',
  jwtValidator,
  parseProductIdParam,
  handleAsync(
    async (req: TReqWithProductId, res: Response, next: NextFunction) => {
      await productController.deleteProduct(req.user.userId, req.productId);

      res.status(204).send({ message: 'Product deleted' });
    },
  ),
);

export { ProductRouter };
