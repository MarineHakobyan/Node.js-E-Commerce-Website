import { getRepository, Repository } from 'typeorm';

import { UserEntity } from '../orm/entities/userEntity';
import { TUser } from '../common/types/user.types';
import { UserRepository } from '../orm/repositories/user.repository';

export default class UserService {
  constructor(private readonly userRepository: UserRepository) {}

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
