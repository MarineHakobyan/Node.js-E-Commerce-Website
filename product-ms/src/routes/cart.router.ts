import { Router, Response, NextFunction } from 'express';

import { ProductController } from '../controllers/product.controller';
import { jwtValidator } from '../middleware/jwtValidator';
import { parseProductIdParam } from '../middleware/product.middleware';
import {
  TReqWithProductId,
} from '../common/types/product.types';
import { TRequestWithToken } from '../common/types/user.types';
import {transformResponseBody} from "../common/helpers";
import {CartOutputDto} from "../dtos/cart.output.dto";
import {CartController} from "../controllers/cart.controller";

const cartController = new CartController();

const CartRouter = Router();

CartRouter.post(
  '/cart/:id',
  parseProductIdParam,
  jwtValidator,
  async (req: TReqWithProductId, res: Response, next: NextFunction) => {
    try {
      const userId = req.user.userId;
      const product = await cartController.addToCart(userId, req.productId);

      res.send(transformResponseBody(CartOutputDto, product));
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
);


CartRouter.get(
  '/cart/',
  jwtValidator,
  async (req: TRequestWithToken, res: Response, next: NextFunction) => {
    try {
      const userId = req.user.userId;
      const cartItems = await cartController.getCart(userId);

      res.json(transformResponseBody(CartOutputDto, cartItems));
    } catch (error) {
      next(error);
    }
  },
);

CartRouter.delete(
    '/cart/:id',
    jwtValidator,
    parseProductIdParam,
    async (req: TReqWithProductId, res: Response, next: NextFunction) => {
        try {
            const userId = req.user.userId;
            await cartController.deleteFromCart(userId, req.productId);

            res.status(200).send({ message: 'Item removed from cart' });
        } catch (error) {
            next(error);
        }
    },
);

export { CartRouter };

