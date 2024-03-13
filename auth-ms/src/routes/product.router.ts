import { Router, Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { UserEntity } from '../orm/entities/user.entity';
import { ProductEntity } from '../orm/entities/product.entity';

// TODO: extract to controller and service
// TODO separate to microservice
const ProductRouter = Router();

ProductRouter.post(
  '/products',
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId, ...productData } = req.body;

    const userRepository = getRepository(UserEntity);
    const productRepository = getRepository(ProductEntity);

    try {
      const user = await userRepository.findOne(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const product = new ProductEntity();
      product.title = productData.title;
      // product.user = user;
      await productRepository.save(product);

      res.json(product);
    } catch (error) {
      console.error(error);
      next(new Error('Error creating product'));
    }
  },
);

ProductRouter.get('/products', async (req, res) => {
  const productRepository = getRepository(ProductEntity);
  const products = await productRepository.find({ relations: ['user'] });
  res.json(products);
});

ProductRouter.put('/products/:productId', async (req, res) => {
  const { productId } = req.params;
  const productRepository = getRepository(ProductEntity);

  try {
    await productRepository.update(productId, req.body);

    const product = await productRepository.findOne(productId, {
      relations: ['user'],
    });

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product.ts not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating product' });
  }
});

ProductRouter.delete(
  '/products/:productId',
  async (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.params;
    const productRepository = getRepository(ProductEntity);
    const result = await productRepository.delete(productId);

    if (result.affected) {
      res.json({ message: 'Product.ts deleted successfully.' });
    } else {
      next(new Error('Product.ts not found or could not be deleted.'));
    }
  },
);

export { ProductRouter };
