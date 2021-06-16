const Joi = require("joi");

const create = Joi.object({
  name: Joi.string().required(),
  ref: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.string().required(),
  sensor: Joi.array().items(Joi.string()),
  actuator: Joi.array().items(Joi.string()),
  tank: Joi.array().items(Joi.string()),
}).required();

const update = Joi.object({
  name: Joi.string().required(),
  ref: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.string().required(),
  sensor: Joi.array().items(Joi.string()),
  actuator: Joi.array().items(Joi.string()),
  tank: Joi.array().items(Joi.string()),
  active: Joi.boolean().required(),
}).required();

module.exports = { create, update };
