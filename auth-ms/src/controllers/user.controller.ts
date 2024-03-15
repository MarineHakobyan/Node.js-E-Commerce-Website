import { User } from '../orm/entities/user.entity';
import { UserService } from '../services/user.service';
import { TUser } from '../common/types/user.types';
import { UserUpdateOptionalDataDto } from '../dtos';
import { UserOutputDto } from '../dtos/user.output.dto';

export class UserController {
  private userService = new UserService();

  async getOne(id: number): Promise<Omit<User, 'password'>> {
    try {
      const user = await this.userService.getOne(id);

      if (!user) {
        throw new Error('User not found');
      }

      const { password, ...result } = user;

      return result;
    } catch (error) {
      throw new Error('Something went wrong');
    }
  }

  async updateOne(
    id: number,
    data: UserUpdateOptionalDataDto,
  ): Promise<UserOutputDto> {
    try {
      const patchedUser = await this.userService.updateOne(id, data);

      if (!patchedUser) {
        throw new Error();
      }

      return patchedUser;
    } catch (error) {
      throw new Error('Failed to update the user');
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
