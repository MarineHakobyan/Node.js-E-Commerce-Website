import { EntityRepository, Repository } from 'typeorm';
import {ProductEntity} from "../entities/productEntity";

@EntityRepository(ProductEntity)
export class UserRepository extends Repository<ProductEntity> {}