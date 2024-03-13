import { getRepository } from 'typeorm';

import { UserEntity } from '../orm/entities/user.entity';
import { User } from '../models/userModel';
import { UserUpdatableOptionalDataDto } from '../dtos';

export class UserService {
  private userRepository = getRepository(UserEntity);

  async getOne(id: number): Promise<UserEntity | undefined> {
    try {
      const user = await this.userRepository.findOne(id);
      return user;
    } catch (error) {
      throw new Error('User retrieval failed,');
    }
  }

  async updateOne(
    id: number,
    data: UserUpdatableOptionalDataDto,
  ): Promise<UserEntity | undefined> {
    try {
      const result = await this.userRepository.update(id, data);

      if (result.affected) {
        return this.userRepository.findOne(id);
      }

      return undefined;
    } catch (error) {
      throw new Error('User update failed,');
    }
  }

  async deleteOne(id: number): Promise<boolean> {
    try {
      const result = await this.userRepository.delete(id);
      return !!result.affected;
    } catch (error) {
      throw new Error('User deletion failed.');
    }
  }
}
