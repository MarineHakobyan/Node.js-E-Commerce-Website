import * as Joi from 'joi';

const passwordSchema = Joi.string()
  .min(8)
  .max(20)
  .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])'))
  .required();

const registrationSchema = Joi.object({
  username: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  password: passwordSchema,
});

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export async function validateRegistration(
  data: any,
): Promise<{ error?: Joi.ValidationError; value: any }> {
  return registrationSchema.validateAsync(data, { abortEarly: false });
}

export async function validateLogin(
  data: any,
): Promise<{ error?: Joi.ValidationError; value: any }> {
  return loginSchema.validateAsync(data, { abortEarly: false });
}
