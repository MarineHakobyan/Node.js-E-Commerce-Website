import { Repository } from 'typeorm';
import _ from 'lodash';

import { UserEntity } from '../orm/entities/userEntity';
import { validateRegistration } from '../validators/authValidator';
import { hashPassword, comparePassword, generateToken } from '../utils/authUtils';
import {TUser} from "../types/userTypes";

export class UserService {
  private readonly userRepository: Repository<UserEntity>;

  constructor(userRepository: Repository<UserEntity>) {
    this.userRepository = userRepository;
  }

  async register(userData: any): Promise<UserEntity> {
    try {
      const { error, value } = await validateRegistration(userData);
      if (error) {
        throw new Error('Validation failed: ' + error.details[0].message);
      }

      const user = new UserEntity();
      user.username = value.username;
      user.email = value.email;
      user.password = await hashPassword(value.password);

      return await this.userRepository.save(user);
    } catch (error) {
      throw new Error('Registration failed: ' + error.message);
    }
  }

  async login(username: string, password: string): Promise<TUser | null> {
    try {
      const user = await this.userRepository.findOne({ username });
      if (!user) {
        return null;
      }

      const isPasswordValid = await comparePassword(password, user.password);
      if (!isPasswordValid) {
        return null;
      }

      const token = generateToken(user);

      return _.omit({ ...user, token }, 'password');
    } catch (error) {
      throw new Error('Login failed: ' + error.message);
    }
  }

  async findUserById(id: number): Promise<TUser | null> {
    try {
      const user = await this.userRepository.findOne(id,);
      return _.omit(user, 'password');
    } catch (error) {
      throw new Error('Failed to find user: ' + error.message);
    }
  }
}
