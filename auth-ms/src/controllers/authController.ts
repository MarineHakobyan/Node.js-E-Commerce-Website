import { comparePassword } from '../utils/authUtils';
import { LoginDto, UserRegistrationDto } from '../dtos';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../orm/entities/user.entity';
import { UserOutputDto } from '../dtos/user.output.dto';

const authService = new AuthService();
const userService = new UserService();

export class AuthController {
  async register(data: UserRegistrationDto) {
    return authService.register(data);
  }

  async login(user: LoginDto) {
    return authService.login(user);
  }

  async updatePassword(
    id: number,
    oldPassword: string,
    newPassword: string,
  ): Promise<UserOutputDto> {
    try {
      const user = await userService.getOne(id);

      if (!user) {
        throw new Error('UserEntity not found');
      }

      const isEligibleToUpdate = await comparePassword(
        oldPassword,
        user.password,
      );

      if (!isEligibleToUpdate) {
        throw new Error('Invalid old password');
      }

      const updatedUser = await authService.updatePassword(id, newPassword);

      if (!updatedUser) {
        throw new Error('Failed to update password');
      }

      return updatedUser;
    } catch (error) {
      throw new Error('Failed to update password');
    }
  }
}
