import { Product } from './Product';

export class User {
  id: number;
  username: string;
  email: string;
  password: string;
  products?: Product[];
}
