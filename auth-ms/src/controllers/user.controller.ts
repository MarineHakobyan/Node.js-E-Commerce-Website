import UserService from '../services/user.service';
import AuthService from '../services/auth.service';
import { User } from '../models/userModel';

export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  async getOne(id: number): Promise<User | null> {
    {
      const { password, ...user } = await this.userService.getOneByData({
        id,
      });

      return user;
    }
  }
}
