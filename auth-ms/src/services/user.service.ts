import { createConnection, Repository } from 'typeorm';

import { UserEntity } from '../orm/entities/user.entity';
import { UserUpdateOptionalDataDto } from '../dtos';
import { ormConfig } from '../config';

export class UserService {
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

  async getOne(id: number): Promise<UserEntity | undefined> {
    try {
      return this.userRepository.findOne(id);
    } catch (error) {
      throw new Error('User retrieval failed');
    }
  }

  async updateOne(
    id: number,
    data: UserUpdateOptionalDataDto,
  ): Promise<UserEntity> {
    try {
      const result = await this.userRepository.update(id, data);

      if (!result.affected) {
        throw new Error('No data has changed');
      }

      return this.userRepository.findOneOrFail(id);
    } catch (error) {
      throw new Error('User update failed');
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
