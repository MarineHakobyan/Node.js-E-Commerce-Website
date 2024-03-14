import * as Joi from 'joi';
import {
  LoginDto,
  UserUpdateOptionalDataDto,
  UserRegistrationDto,
  UpdatePasswordDto, UserUpdateAllDataDto,
} from '../dtos';

export const userRegistrationSchema = Joi.object<UserRegistrationDto>({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(30).required(),
});

export const userUpdateAllSchema = Joi.object<UserRegistrationDto>({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
});

export const userUpdateOptionalSchema = Joi.object<UserUpdateAllDataDto>({
  username: Joi.string().alphanum().min(3).max(30),
  email: Joi.string().email(),
}).or('username', 'email').required();

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
  Joi.object<UserUpdateOptionalDataDto>({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
  });

