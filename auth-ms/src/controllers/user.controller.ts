import { UserEntity } from '../orm/entities/user.entity';
import { UserService } from '../services/user.service';
import { TUser } from '../common/types/user.types';
import { UserUpdatableOptionalDataDto } from '../dtos';

export class UserController {
  private userService = new UserService();

  async getOne(id: number): Promise<TUser | null> {
    const user = await this.userService.getOne(id);

    try {
      if (!user) {
        throw new Error('Use not found.');
      }

      return user;
    } catch (error) {
      throw new Error('Something went wrong');
    }
  }

  async updateOne(
    id: number,
    data: UserUpdatableOptionalDataDto,
  ): Promise<UserEntity | null> {
    try {
      const patchedUser = await this.userService.updateOne(id, data);

      if (!patchedUser) {
        return null;
      }

      return patchedUser;
    } catch (error) {
      throw new Error('Failed to update the user.');
    }
  }

  async deleteOne(userId: number): Promise<boolean> {
    try {
      const result = await this.userService.deleteOne(userId);

      return result;
    } catch (error) {
      return false;
    }
  }
}
