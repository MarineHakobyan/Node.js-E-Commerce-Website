import { Router, Request, Response, NextFunction } from 'express';
import {ProductController} from "../controllers/product.controller";
import {ProductService} from "../services/product.service";

const productService = new ProductService();
const productController = new ProductController(productService);

const ProductRouter = Router();

ProductRouter.post(
    '/products',
    productController.createProduct,
);

ProductRouter.get('/products', productController.getAllProducts);

ProductRouter.put('/products/:productId', productController.updateProduct);

ProductRouter.delete(
    '/products/:productId',
    productController.deleteProduct,
);

export { ProductRouter };
