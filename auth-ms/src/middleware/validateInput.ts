import { Request, Response, NextFunction } from 'express';
import * as Joi from 'joi';

export const validateRequest = (schema: Joi.ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error, value } =  schema.validate(req.body, {
        abortEarly: false,
      });

      if (error) {
        res
          .status(400)
          .json({ error: 'Validation failed', details: error.details });
      } else {
        req.body = value;
        next();
      }
    } catch (err) {
      console.error(err);
      next(err)
    }
  };
};
