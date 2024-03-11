import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/authService';
import { validateRegistration, validateLogin } from '../validators/authValidator';

async function register(req: Request, res: Response): Promise<void> {
  try {
    const { error, value } = await validateRegistration(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const user = await registerUser({
      ...value,
      password: await hashPassword(value.password), // Hash password before saving
    });

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Registration failed' });
  }
}

async function login(req: Request, res: Response): Promise<void> {
  try {
    const { error, value } = await validateLogin(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { username, password } = value;
    const user = await loginUser(username, password);

    if (user) {
      const token = generateToken(user); // Implement token generation
      res.status(200).json({ message: 'Login successful', token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Login failed' });
  }
}

export { register, login };
