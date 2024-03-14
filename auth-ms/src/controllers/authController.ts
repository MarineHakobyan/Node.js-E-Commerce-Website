import { comparePassword } from '../utils/authUtils';
import { LoginDto, UserRegistrationDto } from '../dtos';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

const authService = new AuthService();
const userService = new UserService();

export class AuthController {
  async register(data: UserRegistrationDto) {
    return authService.register(data);
  }

  async login(user: LoginDto) {
    return authService.login(user);
  }

  async updatePassword(id: number, oldPassword: string, newPassword: string) {
    try {
      console.log({ id, oldPassword, newPassword });
      const user = await userService.getOne(id);
      console.log({ user });

      if (!user) {
        throw new Error('User not found');
      }

      const isEligibleToUpdate = await comparePassword(
        oldPassword,
        user.password,
      );
      console.log({ isEligibleToUpdate, oldPassword, newPassword });

      if (!isEligibleToUpdate) {
        throw new Error('Invalid old password');
      }

      const updatedUser = await authService.updatePassword(id, newPassword);

      if (!updatedUser) {
        throw new Error('Failed to update password');
      }

      return updatedUser;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to update password');
    }
  }
}
