import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

import { appConfig } from '../config/appConfig';
import { authConfig } from '../config';
import { User } from '../models/userModel';

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  try {
    return await bcrypt.hash(password, saltRounds);
  } catch (error) {
    throw new Error('Password hashing failed');
  }
}

export function generateToken(userId: number): string {
  const payload = { userId };

  return jwt.sign(payload, authConfig.jwtSecret, {
    expiresIn: authConfig.jwtExpiration,
  });
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
