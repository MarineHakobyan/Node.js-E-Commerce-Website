import express, { NextFunction } from 'express';
import { TIdString, TReqWithProductId } from '../common/types/user.types';

export function validateProductId(
  req: TReqWithProductId,
  res: Response,
  next: NextFunction,
) {
  const { id } = req.params;

  if (id && !isNaN(Number(id))) {
    next(new Error('Invalid Product ID: Must be a number'));
  }

  req.productId = Number(id);
  next();
}
