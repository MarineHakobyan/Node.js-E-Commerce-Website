import { User } from '../models/userModel';
import { UserEntity } from '../orm/entities/userEntity';
import { UserService } from '../services/user.service';
import { TUser } from '../common/types/user.types';

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

  async update(data: {
    id: number;
    userData: any;
  }): Promise<UserEntity | null> {
    try {
      const updatedUser = await this.userService.updateOne(id, data);

      if (!updatedUser) {
        throw new Error('Use not found.');
      }

      return updatedUser;
    } catch (error) {
      throw new Error('Something went wrong.');
    }
  }

  async updateOne(data: Partial<User>): Promise<UserEntity | null> {
    try {
      const patchedUser = await this.userService.updateOne(data);

      if (!patchedUser) {
        return null;
      }

      return patchedUser;
    } catch (error) {
      // Handle errors and return an appropriate response
      return null;
    }
  }

  async delete(data: { userId: number }): Promise<boolean> {
    try {
      const result = await this.userService.deleteOne(data.userId);

      return result;
    } catch (error) {
      return false;
    }
  }
}
