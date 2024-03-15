import { createConnection, getRepository, Repository } from 'typeorm';

import { ProductEntity } from '../orm/entities/product.entity';
import { UserEntity } from '../orm/entities/user.entity';
import { ormConfig } from '../config';
import { CartEntity } from '../orm/entities/cart.entity';

export class ProductService {
  private productRepository: Repository<ProductEntity>;
  private userRepository: Repository<UserEntity>;
  private cartRepository: Repository<CartEntity>;

  constructor() {
    (async () => {
      try {
        const dbConnection = await createConnection(ormConfig);
        this.userRepository = dbConnection.getRepository(UserEntity);
        this.productRepository = dbConnection.getRepository(ProductEntity);
        this.cartRepository = dbConnection.getRepository(CartEntity);
      } catch (error) {
        console.error('Initialization failed:', error);
      }
    })();
  }

  async createProduct(userId: number, productData: any) {
    try {
      return this.productRepository.save({ ...productData, authorId: userId });
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

  async addToCart(userId: number, productId: number) {
    try {
      const cartItem = await this.getCartItem(userId, productId);

      if (cartItem) {
        await this.cartRepository
          .createQueryBuilder()
          .update(CartEntity)
          .set({ quantity: () => 'quantity + 1' })
          .where('userId = :userId', { userId })
          .andWhere('productId = :productId', { productId })
          .execute();

        return this.cartRepository.findOne({ userId, productId });
      }

      return this.cartRepository.save({ userId, productId });
    } catch (err) {
      throw new Error('Failed to add the item to cart');
    }
  }

  async removeFromCart(userId: number, productId: number) {
    try {
      await this.cartRepository.delete({ userId, productId });
    } catch (err) {
      throw new Error('failed to remove the item');
    }
  }

  async getCart(userId: number) {
    try {
      const cartItems = await this.cartRepository.find({
        where: { userId },
        relations: ['product'],
      });

      return cartItems;
    } catch (err) {
      throw new Error('Failed to fetch cart items');
    }
  }

  async getCartItem(userId: number, productId: number) {
    try {
      return this.cartRepository.findOne({
        where: { userId, productId },
        relations: ['product'],
      });
    } catch (err) {
      throw new Error('Failed to get cart item');
    }
  }

  async getOne(productId: number) {
    try {
      return await this.productRepository.findOne(productId);
    } catch (err) {
      throw new Error();
    }
  }

  async updateProduct(productId: number, productData: any) {
    try {
      await this.productRepository.update(productId, productData);

      return await this.productRepository.findOne(productId, {
        relations: ['user'],
      });
    } catch (err) {
      throw new Error('Failed to update product');
    }
  }

  async deleteProduct(productId: number) {
    try {
      const result = await this.productRepository.delete(productId);
      if (!result.affected) {
        throw new Error('Product not found or could not be deleted.');
      }
    } catch (err) {
      throw new Error('Failed to delete product');
    }
  }
}
