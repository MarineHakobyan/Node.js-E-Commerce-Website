import Joi from 'joi';
import { intIdSchema } from '../common/schemas/intId.schema';

export const addToCartSchema = Joi.object({
  productId: intIdSchema.required(),
});
