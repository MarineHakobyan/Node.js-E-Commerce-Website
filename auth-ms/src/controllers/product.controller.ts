import { ProductService } from '../services/product.service';
import { ProductEntity } from '../orm/entities/product.entity';
import { Product } from '../models/Product';

export class ProductController {
  private productService = new ProductService();

  async createProduct(
    userId: number,
    productData: Product,
  ): Promise<ProductEntity> {
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

  async updateProduct(productId: number, productData: any) {
    const product = await this.productService.updateProduct(
      productId,
      productData,
    );
    return product;
  }

  async deleteProduct(productId: number) {
    await this.productService.deleteProduct(productId);
  }
}
