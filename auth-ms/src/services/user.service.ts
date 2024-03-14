import { createConnection, Repository } from 'typeorm';

import { UserEntity } from '../orm/entities/user.entity';
import { UserUpdatableOptionalDataDto } from '../dtos';
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
