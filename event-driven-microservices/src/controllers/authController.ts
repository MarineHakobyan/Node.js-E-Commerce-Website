import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/authService';
import { generateToken, hashPassword } from '../utils/authUtils';
import Joi from 'joi';

export async function register(req: Request, res: Response): Promise<void> {
  try {
    const registrationSchema = Joi.object({
      username: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    const { error, value } = registrationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const user = await registerUser({
      ...value,
      password: await hashPassword(value.password),
    });

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Registration failed' });
  }
}

export async function login(req: Request, res: Response): Promise<void> {
  try {
    const loginSchema = Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
    });

    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { username, password } = value;
    const user = await loginUser(username, password);

    if (user) {
      const token = generateToken(user);
      // Set token in headers or cookie for the client to use
      res.status(200).json({ message: 'Login successful', token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Login failed' });
  }
}
