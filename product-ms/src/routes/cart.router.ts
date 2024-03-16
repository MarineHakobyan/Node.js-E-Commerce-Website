import { Router, Response, NextFunction } from 'express';

import { jwtValidator } from '../middleware/jwtValidator';
import { parseProductIdParam } from '../middleware/product.middleware';
import { TReqWithProductId } from '../common/types/product.types';
import { TRequestWithToken } from '../common/types/user.types';
import { transformResponseBody } from '../common/helpers';
import { CartOutputDto } from '../dtos/cart.output.dto';
import { CartController } from '../controllers/cart.controller';
import { handleAsync } from '../common/helpers';

const cartController = new CartController();

const CartRouter = Router();

CartRouter.post(
  '/cart/:id',
  parseProductIdParam,
  jwtValidator,
  handleAsync(
    async (req: TReqWithProductId, res: Response, next: NextFunction) => {
      try {
        const userId = req.user.userId;
        const product = await cartController.addToCart(userId, req.productId);

        res.status(201).send(transformResponseBody(CartOutputDto, product));
      } catch (error) {
        next(error);
      }
    },
  ),
);

CartRouter.get(
  '/cart/',
  jwtValidator,
  handleAsync(
    async (req: TRequestWithToken, res: Response, next: NextFunction) => {
      try {
        const userId = req.user.userId;
        const cartItems = await cartController.getCart(userId);

        res.status(200).send(transformResponseBody(CartOutputDto, cartItems));
      } catch (error) {
        next(error);
      }
    },
  ),
);

CartRouter.delete(
  '/cart/:id',
  jwtValidator,
  parseProductIdParam,
  handleAsync(
    async (req: TReqWithProductId, res: Response, next: NextFunction) => {
      try {
        const userId = req.user.userId;
        await cartController.deleteFromCart(userId, req.productId);

        res.status(204).send({ message: 'Item removed from cart' });
      } catch (error) {
        next(error);
      }
    },
  ),
);

export { CartRouter };
