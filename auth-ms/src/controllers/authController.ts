const AuthService = require('./auth.service');

const authService = new AuthService();

export class AuthController {
  async register(data) {
    return authService.register(data);
  }

  async login(user) {
    return authService.login(user);
  }

  async refreshToken(refreshToken: string) {
    return authService.refreshToken(refreshToken);
  }

  async updateOne(id: number, password: string) {
    try {
      const updatedUser = await authService.updatePassword(id, password);

      if (!updatedUser) {
        throw new Error('User not found');
      }

      return updatedUser;
    } catch (error) {
      throw new Error('Failed to update the password');
    }
  }
}
