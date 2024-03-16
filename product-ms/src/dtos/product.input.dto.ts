import Joi from 'joi';
import { CategoryEnum } from '../common/enums/productCategory.enum';

export class ProductInputDto {
  title: string;
  description: string;
  category: string;
  image: string | null;
  weight: string | null;
  dimensions: string | null;
  material: string | null;
}
