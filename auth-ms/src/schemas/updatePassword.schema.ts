import Joi from 'joi';
import { UpdatePasswordDto } from '../dtos';

export const updatePasswordSchema = Joi.object<UpdatePasswordDto>({
  email: Joi.string().email().required(),
  oldPassword: Joi.string().min(8).max(30).required(),
  newPassword: Joi.string().min(8).max(30).required(),
});
