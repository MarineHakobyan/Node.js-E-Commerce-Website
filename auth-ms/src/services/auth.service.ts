import { UserEntity } from '../orm/entities/userEntity';
import { validateRegistration } from '../validators/authValidator';
import { hashPassword } from '../utils/authUtils';
import { TUser } from '../common/types/user.types';
import { UserRepository } from '../orm/repositories/user.repository';

export default class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async register(userData: any): Promise<UserEntity> {
    try {
      const { error, data } = await validateRegistration(userData);
      if (error) {
        throw new Error('Validation failed: ' + error.details[0].message);
      }

      const user = new UserEntity();
      user.password = await hashPassword(data.password);
      user.username = data.username;
      user.email = data.email;

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
