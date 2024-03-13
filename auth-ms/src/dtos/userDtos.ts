import { Joi } from 'joi';

export class UserRegistrationDto {
    username: string;
    email: string;
    password: string;
}

export const userRegistrationSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
});

export class LoginDto {
    password: string;
}

export const loginSchema = Joi.object({
    password: Joi.string().min(8).required(),
});
