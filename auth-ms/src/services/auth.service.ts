import { createConnection, getRepository, Repository } from 'typeorm';
import bcrypt from 'bcrypt';

import { UserEntity } from '../orm/entities/user.entity';
import { User } from '../models/userModel';
import { LoginDto } from '../dtos';
import { generateToken } from '../utils/authUtils';
import { ormConfig, authConfig } from '../config';

export class AuthService {
  private userRepository: Repository<UserEntity>;

  constructor() {
    (async () => {
      try {
        const dbConnection = await createConnection(ormConfig);
        this.userRepository = dbConnection.getRepository(UserEntity);
      } catch (error) {
        console.error('Initialization failed:', error);
      }
    })();
  }

  async register(userData: any): Promise<Omit<UserEntity, 'password'>> {
    try {
      const existingUser = await this.userRepository.findOne({
        where: { email: userData.email },
      });

      if (existingUser) {
        throw new Error('Username or email already registered');
      }

      const hashedPassword = await bcrypt.hash(userData.password, 10);

      const newUser = new UserEntity();
      newUser.username = userData.username;
      newUser.email = userData.email;
      newUser.password = hashedPassword;

      const { password, ...savedUser } = await this.userRepository.save(
        newUser,
      );

      return savedUser;
    } catch (error) {
      throw new Error('Registration failed: ' + error.message);
    }
  }

  async login(loginData: LoginDto): Promise<User> {
    try {
      const x = await this.userRepository.find();
      const user = await this.userRepository.findOne({
        where: { email: loginData.email },
      });

      if (!user) {
        throw new Error('User not found');
      }

      const passwordMatch = await bcrypt.compare(
        loginData.password,
        user.password,
      );

      if (!passwordMatch) {
        throw new Error('Invalid login or password');
      }

      const token = generateToken(user.id);

      const { password, ...data } = user;

      return {
        ...data,
        token,
      };
    } catch (error) {
      console.error(error);
      if (error.message === 'Invalid login or password') {
        throw error;
      }

      throw new Error('Login failed');
    }
  }

  async updatePassword(id: number, password: string): Promise<UserEntity> {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      await this.userRepository.update(id, { password: hashedPassword });
      const updated = await this.userRepository.findOne(id);

      if (!updated) {
        throw new Error('Failed to update User');
      }

      return updated;
    } catch (error) {
      throw new Error('User update failed.');
    }
  }
}
