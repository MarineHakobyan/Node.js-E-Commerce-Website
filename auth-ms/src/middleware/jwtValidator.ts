import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { authConfig } from '../config/auth.config';

export const jwtValidator = (
  req: Request | any,
  res: Response,
  next: NextFunction,
) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - Missing token' });
  }

  try {
    const decoded = jwt.verify(token, authConfig.jwtSecret);
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Unauthorized - Invalid token',
    });
  }
};
