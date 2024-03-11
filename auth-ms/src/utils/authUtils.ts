import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { config } from '../config/config';

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  try {
    return await bcrypt.hash(password, saltRounds);
  } catch (error) {
    throw new Error('Password hashing failed');
  }
}

export async function generateToken(user: any): Promise<string> {
  try {
    const payload = {
      userId: user.id,
      username: user.username,
      email: user.email,
    };
    return jwt.sign(payload, config.secret, { expiresIn: '1h' });
  } catch (error) {
    throw new Error('Token generation failed');
  }
}

export async function comparePassword(
  candidatePassword: string,
  hashedPassword: string,
): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  } catch (error) {
    throw new Error('Password comparison failed');
  }
}
