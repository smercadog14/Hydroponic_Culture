const Joi = require("joi");

const create = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  concentration: Joi.string().required(),
  type: Joi.string().required(),
  stabParams: Joi.array().items(Joi.number()),
  warning: Joi.string().required(),
  recommendation: Joi.string().required(),
  compound: Joi.array().items(Joi.string()),
}).required();

const update = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  concentration: Joi.string().required(),
  type: Joi.string().required(),
  stabParams: Joi.array().items(Joi.number()),
  warning: Joi.string().required(),
  recommendation: Joi.string().required(),
  compound: Joi.array().items(Joi.string()),
  active: Joi.boolean().required(),
}).required();

module.exports = { create, update };
