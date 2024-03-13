import * as Joi from 'joi';
import {
  LoginDto,
  UserUpdatableOptionalDataDto,
  UserRegistrationDto, UpdatePasswordDto,
} from '../dtos';

export const userRegistrationSchema = Joi.object<UserRegistrationDto>({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

export const loginSchema = Joi.object<LoginDto>({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export const updateUserSchema = Joi.object<UpdatePasswordDto>({
  oldPassword: Joi.string().alphanum().min(3).max(30).optional(),
  newPassword: Joi.string().email().optional(),
});

export const updatePasswordSchema = Joi.object<UpdatePasswordDto>({
  email: Joi.string().alphanum().min(3).max(30).optional(),
  oldPassword: Joi.string().alphanum().min(3).max(30).optional(),
  newPassword: Joi.string().email().optional(),});

export const updateUserOptionalsSchema = Joi.object<UserUpdatableOptionalDataDto>({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
});
