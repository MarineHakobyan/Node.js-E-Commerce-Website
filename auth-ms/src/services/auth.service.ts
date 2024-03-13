import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import { UserEntity } from '../orm/entities/userEntity';
import { User } from '../models/userModel';

export class AuthService {
  private userRepository = getRepository(UserEntity);

  async register(userData: any): Promise<Omit<UserEntity, 'password'>> {
    try {
      const existingUser = await this.userRepository.findOne({
        where: [{ username: userData.username }, { email: userData.email }],
      });

      if (existingUser) {
        throw new Error('Username or email already registered');
      }

      const hashedPassword = await bcrypt.hash(userData.password, 10);

      const newUser = new UserEntity();
      newUser.username = userData.username;
      newUser.email = userData.email;
      newUser.password = hashedPassword;

      const { password, ...savedUser } =
        await this.userRepository.save(newUser);

      return savedUser;
    } catch (error) {
      throw new Error('Registration failed: ' + error.message);
    }
  }

  async updatePassword(
    id: number,
    password: string,
  ): Promise<UserEntity | undefined> {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      await this.userRepository.update(id, { password: hashedPassword });

      return this.userRepository.findOne(id);
    } catch (error) {
      throw new Error('User update failed.');
    }
  }
}
