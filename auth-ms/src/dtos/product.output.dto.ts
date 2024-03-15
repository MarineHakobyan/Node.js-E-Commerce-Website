import { CategoryEnum } from '../common/enums/productCategory.enum';

export class ProductOutputDto {
  id: number;
  title: string;
  description: string;
  category: CategoryEnum;
  image: string | null;
  weight: string | null;
  dimensions: string | null;
  material: string | null;
}
