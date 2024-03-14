import * as Joi from 'joi';
import {
  LoginDto,
  UserUpdatableOptionalDataDto,
  UserRegistrationDto,
  UpdatePasswordDto,
} from '../dtos';

export const userRegistrationSchema = Joi.object<UserRegistrationDto>({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(30).required(),
});

export const loginSchema = Joi.object<LoginDto>({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(30).required(),
});

export const updatePasswordSchema = Joi.object<UpdatePasswordDto>({
  email: Joi.string().email().required(),
  oldPassword: Joi.string().min(8).max(30).required(),
  newPassword: Joi.string().min(8).max(30).required(),
});

export const updateUserOptionalsSchema =
  Joi.object<UserUpdatableOptionalDataDto>({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
  });
