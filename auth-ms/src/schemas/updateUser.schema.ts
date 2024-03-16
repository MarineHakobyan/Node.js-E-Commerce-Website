import Joi from 'joi';
import { UserRegistrationDto } from '../dtos';

export const userUpdateAllSchema = Joi.object<UserRegistrationDto>({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
});
