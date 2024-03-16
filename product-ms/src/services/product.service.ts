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
      const foundUser = await this.userRepository.findOneOrFail(userId);
      const {user, ...savedProduct } = await this.productRepository.save({
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

  async addToCart(userId: number, productId: number): Promise<Cart> {
    try {
      const cartItem = await this.getCartItem(userId, productId);
      console.log({cartItem, userId, productId})

      if (cartItem) {
        await this.cartRepository
          .createQueryBuilder()
          .update(Cart)
          .set({ quantity: () => 'quantity + 1' })
          .where('userId = :userId', { userId })
          .andWhere('productId = :productId', { productId })
          .execute();

        const newCartItem =await this.cartRepository.findOne({ userId, productId });

        if(!newCartItem) {
          throw new Error('Cart item not saved')
        }

        return newCartItem;
      }

      return this.cartRepository.save({ userId, productId });
    } catch (err) {
      console.log(err)
      throw new Error('Failed to add the item to cart');
    }
  }

  async removeFromCart(userId: number, productId: number) {
    try {
      const result = await this.cartRepository.delete({ userId, productId });

      if(!result.affected) {
        throw new Error('Cart item not found')
      }
    } catch (err) {
      throw new Error('Failed to remove the item');
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
        .getOne();
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
