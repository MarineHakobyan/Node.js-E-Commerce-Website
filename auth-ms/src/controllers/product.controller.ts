import { Request, Response, NextFunction } from 'express';
import { ProductService } from '../services/product.service';

export class ProductController {
    private productService: ProductService;

    constructor(productService: ProductService) {
        this.productService = productService;
    }

    async createProduct(req: Request, res: Response, next: NextFunction) {
        const { userId, ...productData } = req.body;

        try {
            const product = await this.productService.createProduct(userId, productData);
            res.json(product);
        } catch (error) {
            next(error); // Pass error to middleware for handling
        }
    }

    async getAllProducts(req: Request, res: Response) {
        const products = await this.productService.getAllProducts();
        res.json(products);
    }

    async updateProduct(req: Request, res: Response, next: NextFunction) {
        const { productId } = req.params;
        const productData = req.body;

        try {
            const product = await this.productService.updateProduct(productId, productData);
            if (product) {
                res.json(product);
            } else {
                res.status(404).json({ message: 'Product not found' });
            }
        } catch (error) {
            next(error);
        }
    }

    async deleteProduct(req: Request, res: Response, next: NextFunction) {
        const { productId } = req.params;

        try {
            await this.productService.deleteProduct(productId);
            res.json({ message: 'Product deleted successfully.' });
        } catch (error) {
            next(error);
        }
    }
}
