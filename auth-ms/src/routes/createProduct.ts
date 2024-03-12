import { Router, Request, Response, NextFunction } from 'express';
import { getRepository, QueryFailedError } from 'typeorm';
import { UserEntity } from '../orm/entities/userEntity';
import { ProductEntity } from '../orm/entities/productEntity';

const router = Router();

router.post(
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
      product.user = user;
      await productRepository.save(product);

      res.json(product);
    } catch (error) {
      console.error(error);
      next(new Error('Error creating product'));
    }
  },
);

export { router as createProductRouter };
