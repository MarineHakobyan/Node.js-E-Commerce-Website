import { Request, Response, NextFunction } from 'express';

export const handleAsync =
  (fn: Function) =>
  (req: Request, res: Response, next: NextFunction): Promise<void> => {
    return Promise.resolve(fn(req, res, next)).catch(next);
  };
