import { createConnection, getRepository, Repository } from 'typeorm';

import { Product } from '../orm/entities/product.entity';
import { User } from '../orm/entities/user.entity';
import { dbConfig } from '../config';
import { Cart } from '../orm/entities/cart.entity';

export class ProductService {
  private productRepository: Repository<Product>;
  private userRepository: Repository<User>;
  private cartRepository: Repository<Cart>;

  constructor() {
    (async () => {
      try {
        const dbConnection = await createConnection(dbConfig);
        this.userRepository = dbConnection.getRepository(User);
        this.productRepository = dbConnection.getRepository(Product);
        this.cartRepository = dbConnection.getRepository(Cart);
      } catch (error) {
        console.error('Initialization failed:', error);
      }
    })();
  }

  async createProduct(userId: number, productData: any) {
    try {
      return this.productRepository.save({ ...productData, ownerId: userId });
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
          .update(Cart)
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
      });

      return cartItems;
    } catch (err) {
      throw new Error('Failed to fetch cart items');
    }
  }

  async getCartItem(userId: number, productId: number) {
    try {
      return this.cartRepository
        .createQueryBuilder('cart')
        .leftJoinAndSelect('cart.product', 'product')
        .where('cart.userId = :userId', { userId })
        .andWhere('product.id = :productId', { productId })
        .getMany();
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
