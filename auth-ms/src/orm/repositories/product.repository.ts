import { EntityRepository, Repository } from 'typeorm';
import {ProductEntity} from "../entities/product.entity";

@EntityRepository(ProductEntity)
export class UserRepository extends Repository<ProductEntity> {}