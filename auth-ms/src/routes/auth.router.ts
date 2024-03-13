import express, { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { UserEntity } from '../orm/entities/userEntity';
import { UserRepository } from '../orm/repositories/user.repository';
import UserService from '../services/user.service';
import AuthService from '../services/auth.service';

export const AuthRouter = express.Router();

const userRepository = getRepository(UserEntity);

const userService = new UserService(new UserRepository());
const authService = new AuthService(new UserRepository());

AuthRouter.post(
  '/user',
  async ({ body }: Request, res: Response, next: NextFunction) => {
    try {
      const { email, username } = body;
      const userRepository = getRepository(UserEntity);
      const userExists = await userService.getOneByData({ email });

      if (userExists) {
        next(new Error('Email already registered'));
      }

      const user = new UserEntity();
      await userRepository.save(user);
      const { password, ...data } = user;

      res.json(data);
    } catch (error) {
      next(new Error('Failed loading data.'));
    }
  },
);
