import { createConnection, Repository } from 'typeorm';

import { Product } from '../orm/entities/product.entity';
import { User } from '../orm/entities/user.entity';
import { appConfig, dbConfig } from '../config';
import { RabbitMQClient } from './rabbitMq';
import { RabbitMessage } from '../common/interfaces/amqp.interfaces';

export class ProductService {
  private productRepository: Repository<Product>;
  private rabbitMQClient: RabbitMQClient;

  constructor() {
    (async () => {
      try {
        this.rabbitMQClient = new RabbitMQClient(appConfig.amqpUrl);

        const dbConnection = await createConnection(dbConfig);
        this.productRepository = dbConnection.getRepository(Product);
      } catch (error) {
        console.error('Initialization failed:', error);
      }
    })();
  }

  async createProduct(userId: number, productData: any) {
    try {
      const message: RabbitMessage = {
        method: 'GET',
        url: '/user',
        body: { userId },
      };
      const foundUser = await this.rabbitMQClient.sendAndReceive(
        message,
        appConfig.userQueue,
      );
      const { user, ...savedProduct } = await this.productRepository.save({
        ...productData,
        ownerId: userId,
        user: foundUser,
      });

      return savedProduct;
    } catch (err) {
      throw new Error('Failed to create the product');
    }
  }

  async getAllProducts() {
    try {
      return await this.productRepository.find();
    } catch (err) {
      throw new Error();
    }
  }

  async getOne(productId: number) {
    try {
      return await this.productRepository.findOne(productId);
    } catch (err) {
      throw new Error();
    }
  }

  async updateProduct(userId: number, productId: number, productData: any) {
    try {
      console.log({ productId, productData, userId });
      const product = await this.productRepository.findOne(productId, {
        relations: ['user'],
      });
      console.log({ product });

      if (!product?.user || userId !== product.user.id) {
        throw new Error('Cannot delete the product');
      }
      await this.productRepository.update(productId, productData);

      return await this.productRepository.findOne(productId, {
        relations: ['user'],
      });
    } catch (err) {
      console.log(err);
      throw new Error('Failed to update product');
    }
  }

  async deleteProduct(userId: number, productId: number) {
    try {
      const result = await this.productRepository.delete(productId);
      if (!result.affected) {
        throw new Error('Product not found or could not be deleted.');
      }
    } catch (err) {
      console.log(err);
      throw new Error('Failed to delete product');
    }
  }
}
