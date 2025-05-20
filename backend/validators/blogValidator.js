import Joi from "joi";

export const createBlogSchema = Joi.object({
  title: Joi.string().min(5).required(),
  content: Joi.string().min(20).required(),
  tags: Joi.array().items(Joi.string()).optional(),
  coverImage: Joi.string().uri().optional().allow(""),
  isPublished: Joi.boolean().optional(),
});
