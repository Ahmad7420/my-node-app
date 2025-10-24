import Joi from "joi";

export const projectCreationSchema = Joi.object({
  name: Joi.string().trim().min(1).required(),
  description: Joi.string().trim().min(1).required(),
  number: Joi.string().trim().min(1).required(),
});
