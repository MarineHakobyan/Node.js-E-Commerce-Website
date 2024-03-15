import { ProductService } from '../services/product.service';
import { Product } from '../orm/entities/product.entity';
import { ProductOutputDto } from '../dtos/product.output.dto';

export class ProductController {
  private productService = new ProductService();

  async createProduct(
    userId: number,
    productData: ProductOutputDto,
  ): Promise<ProductOutputDto> {
    const product = await this.productService.createProduct(
      userId,
      productData,
    );

    return product;
  }

  async getAllProducts() {
    const products = await this.productService.getAllProducts();

    return products;
  }

  async addToCart(userId: number, productId: number) {
    return this.productService.addToCart(userId, productId);
  }

  async getCart(userId: number) {
    return this.productService.getCart(userId);
  }

  async deleteFromCart(userId: number, productId: number) {
    return this.productService.removeFromCart(userId, productId);
  }

  async getOne(productId: number, userId: number) {
    const products = await this.productService.getOne(productId);

    return products;
  }

  async updateProduct(userId: number, productId: number, productData: any) {
    const product = await this.productService.updateProduct(
      userId,
      productId,
      productData,
    );

    return product;
  }

  async deleteProduct(userId: number, productId: number) {
    await this.productService.deleteProduct(userId, productId);
  }
}
