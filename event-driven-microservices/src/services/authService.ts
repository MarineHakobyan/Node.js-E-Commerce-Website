import { registerUser, loginUser } from '../models/userModel';
import { validateRegistration, validateLogin } from '../validators/authValidator';
import { UserEntity } from '../orm/entities/userEntity';

export async function register(reqBody: any): Promise<UserEntity> {
  try {
    const validatedData = await validateRegistration(reqBody);
    const user = await registerUser(validatedData);
    return user;
  } catch (error) {
    throw new Error('Registration failed');
  }
}

export async function login(reqBody: any): Promise<string> {
  try {
    const { username, password } = await validateLogin(reqBody);
    const user = await loginUser(username, password);

    if (user) {
      // Implement successful login logic (generate token, set session etc.)
      return 'Login successful';
    } else {
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    throw new Error('Login failed');
  }
}

export async function findUserById (): Promise<any> {}
