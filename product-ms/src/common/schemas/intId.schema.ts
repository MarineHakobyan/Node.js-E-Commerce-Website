import Joi from "joi";

export const intIdSchema = Joi.number().integer().positive()