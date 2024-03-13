import {comparePassword} from "../utils/authUtils";
import {LoginDto, UserRegistrationDto} from "../dtos";
import {AuthService} from "../services/auth.service";

const authService = new AuthService();

export class AuthController {
  async register(data: UserRegistrationDto) {
    return authService.register(data);
  }

  async login(user:LoginDto) {
    return authService.login(user);
  }

  async refreshToken(refreshToken: string) {
    return authService.refreshToken(refreshToken);
  }

  async updatePassword(id: number, oldPassword: string, newPassword: string) {
    try {
      const user = await authService.getOne(id);

      if (!user) {
        throw new Error('User not found');
      }

      const isEligibleToUpdate = await comparePassword(oldPassword, user.password)

      if (!isEligibleToUpdate) {
        throw new Error('Invalid old password');
      }

      const updatedUser = await authService.updatePassword(id, newPassword);

      return updatedUser;
    } catch (error) {
      throw new Error('Failed to update password');
    }
  }

}
