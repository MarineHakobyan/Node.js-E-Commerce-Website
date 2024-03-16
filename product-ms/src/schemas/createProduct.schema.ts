import Joi from 'joi';
import { CategoryEnum } from '../common/enums/productCategory.enum';
import { ProductInputDto } from '../dtos/product.input.dto';

export const createProductSchema = Joi.object<ProductInputDto>({
  title: Joi.string().min(3).max(50).required(),
  description: Joi.string().min(10).required(),
  category: Joi.string()
    .valid(...Object.values(CategoryEnum))
    .required(),
  image: Joi.string().allow('').optional().empty(null),
  weight: Joi.string().allow('').optional().empty(null),
  dimensions: Joi.string().allow('').optional().empty(null),
  material: Joi.string().allow('').optional().empty(null),
});
