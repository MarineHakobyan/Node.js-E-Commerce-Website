import express, { NextFunction, Request, Response } from 'express';
import { getRepository, QueryFailedError } from 'typeorm';
import { UserEntity } from '../orm/entities/userEntity';
import { userService } from '../services/user.service';

export const AuthRouter = express.Router();

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
