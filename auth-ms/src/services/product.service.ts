import {createConnection, getRepository, Repository} from 'typeorm';

import { ProductEntity } from '../orm/entities/product.entity';
import { UserEntity } from '../orm/entities/user.entity';
import {ormConfig} from "../config";

export class ProductService {
  private productRepository: Repository<ProductEntity>;
  private userRepository: Repository<UserEntity>;

  constructor() {
    (async () => {
      try {
        const dbConnection = await createConnection(ormConfig);
        this.userRepository = dbConnection.getRepository(UserEntity);
        this.productRepository = dbConnection.getRepository(ProductEntity);
      } catch (error) {
        console.error('Initialization failed:', error);
      }
    })();
  }

  async createProduct(userId: number, productData: any) {
    const user = await this.userRepository.findOne(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const product = new ProductEntity();
    product.title = productData.title;
    // product.user = user;
    await this.productRepository.save(product);

    return product;
  }

  async getAllProducts() {
    return await this.productRepository.find({ relations: ['user'] });
  }

  async updateProduct(productId: number, productData: any) {
    await this.productRepository.update(productId, productData);
    return await this.productRepository.findOne(productId, {
      relations: ['user'],
    });
  }

  async deleteProduct(productId: number) {
    const result = await this.productRepository.delete(productId);
    if (!result.affected) {
      throw new Error('Product not found or could not be deleted.');
    }
  }
}
