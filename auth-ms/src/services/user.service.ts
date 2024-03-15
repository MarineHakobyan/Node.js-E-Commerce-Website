import { createConnection, Repository } from 'typeorm';

import { User } from '../orm/entities/user.entity';
import { UserUpdateOptionalDataDto } from '../dtos';
import { dbConfig } from '../config';
import { UserOutputDto } from '../dtos/user.output.dto';

export class UserService {
  private userRepository: Repository<User>;

  constructor() {
    (async () => {
      try {
        const dbConnection = await createConnection(dbConfig);
        this.userRepository = dbConnection.getRepository(User);
      } catch (error) {
        console.error('Initialization failed:', error);
      }
    })();
  }

  async getOne(id: number): Promise<User | undefined> {
    try {
      return this.userRepository.findOne(id);
    } catch (error) {
      throw new Error('User retrieval failed');
    }
  }

  async updateOne(
    id: number,
    data: UserUpdateOptionalDataDto,
  ): Promise<UserOutputDto> {
    try {
      const UpdatedResult = await this.userRepository.update(id, data);

      if (!UpdatedResult.affected) {
        throw new Error('No data has changed');
      }

      const user = await this.userRepository.findOneOrFail(id);
      const { password, ...result } = user;

      return result;
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
