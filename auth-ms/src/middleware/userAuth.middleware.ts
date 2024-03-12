import express, { NextFunction } from 'express';
import { TIdString } from '../types/user.types';

const router = express.Router();

export function validateUserId(
  req: Request & { userId?: number; params?: TIdString },
  res: Response,
  next: NextFunction,
) {
  const id = req.params?.id;
  if (!id || isNaN(+id)) {
    next(new Error('Invalid user ID: Must be a number'));
  }

  req.userId = parseInt(id as string, 10);
  next();
}

export { router };
