import { Request, Response, NextFunction } from 'express';
import logger from './logger';

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
    logger.error(err.message, { error: err });
    res.status(500).send(err.message);
}