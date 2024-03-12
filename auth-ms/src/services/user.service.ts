import { getRepository, Repository } from 'typeorm';

import { UserEntity } from '../orm/entities/userEntity';
import { TUser } from '../types/user.types';

class UserService {
  private readonly userRepository: Repository<UserEntity>;

  constructor(userRepository: Repository<UserEntity>) {
    this.userRepository = userRepository;
  }

  async getOneByData(
    data: Partial<UserEntity | 'id' | 'email'>,
  ): Promise<TUser | null | any> {
    try {
      const user = await this.userRepository.findOne({ where: data });

      return user || null;
    } catch (error) {
      throw new Error('User does not exist.');
    }
  }
}

const userRepository = getRepository(UserEntity);
export const userService = new UserService(userRepository);
