import Joi from 'joi';
import { LoginDto } from '../dtos';

export const loginSchema = Joi.object<LoginDto>({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(30).required(),
});
