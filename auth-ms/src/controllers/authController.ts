import { Request, Response } from 'express';

import {
  validateRegistration,
  validateLogin,
} from '../validators/authValidator';
import { generateToken, hashPassword } from '../utils/authUtils';
import UserService from '../services/user.service';

export default class AuthController {
  private readonly authService: UserService;

  constructor(authService: UserService) {
    this.authService = authService;
  }

  async register(req: Request, res: Response): Promise<void> {
    try {
      const { error, value } = await validateRegistration(req.body);
      if (error) {
        res.status(400).json({ message: error.details[0].message });
      }

      const user = await this.authService.register({
        ...value,
        password: await hashPassword(value.password),
      });

      res.status(201).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Registration failed' });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { error, value } = await validateLogin(req.body);
      if (error) {
        res.status(400).json({ message: error.details[0].message });
      }

      const { username, password } = value;
      const user = await this.authService.login(username, password);

      if (user) {
        const token = generateToken(user);
        res.status(200).json({ message: 'Login successful', token });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Login failed' });
    }
  }
}
