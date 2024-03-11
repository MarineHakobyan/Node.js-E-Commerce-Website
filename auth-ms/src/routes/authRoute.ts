import { Router } from 'express';

import AuthController from '../controllers/authController';
import AuthService from '../services/authService';
import { UserEntity } from '../orm/entities/userEntity';
import { AppDataSource } from '../common/datasource';

const userRepository = AppDataSource.getRepository(UserEntity);
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

const authRouter = Router();

authRouter.post('/register', authController.register.bind(authController));
authRouter.post('/login', authController.login.bind(authController));

export default authRouter;
