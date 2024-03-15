import { NextFunction, Response } from 'express';
import { TReqWithProductId } from '../common/types/product.types';

export function parseProductIdParam(
  req: TReqWithProductId,
  res: Response,
  next: NextFunction,
) {
  const { id } = req.params;

  if (id && !isNaN(Number(id))) {
    next(new Error('Invalid ProductEntity ID: Must be a number'));
  }

  req.productId = Number(id);
  next();
}
