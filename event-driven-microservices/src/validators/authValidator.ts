import * as Joi from 'joi';

const registrationSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
});

export async function validateRegistration(data: any): Promise<any> {
    return await registrationSchema.validateAsync(data, { abortEarly: false });
}

export async function validateLogin(data: any): Promise<any> {
    return await loginSchema.validateAsync(data, { abortEarly: false });
}