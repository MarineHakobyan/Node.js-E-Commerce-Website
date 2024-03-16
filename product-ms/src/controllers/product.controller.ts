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

  async getOne(productId: number, userId: number):Promise<Product> {
    const product = await this.productService.getOne(productId);

    if(!product){
      throw new Error('Product not found')
    }

    return product;
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
