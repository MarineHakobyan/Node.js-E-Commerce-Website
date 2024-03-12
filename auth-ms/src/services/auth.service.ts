import { UserEntity } from '../orm/entities/userEntity';
import { validateRegistration } from '../validators/authValidator';
import { hashPassword } from '../utils/authUtils';
import { TUser } from '../types/user.types';
import { Repository } from 'typeorm';

export class AuthService {
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

  async login(username: string, password: string): Promise<TUser | null | any> {
    try {
    } catch (error) {
      throw new Error('Login failed: ' + error.message);
    }
  }
}
