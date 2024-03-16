import Joi from 'joi';
import { UserUpdateAllDataDto } from '../dtos';

export const userUpdateOptionalSchema = Joi.object<UserUpdateAllDataDto>({
  username: Joi.string().alphanum().min(3).max(30),
  email: Joi.string().email(),
})
  .or('username', 'email')
  .required();
