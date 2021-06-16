const Joi = require("joi");

const create = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  height: Joi.number().required(),
  width: Joi.number().required(),
  valueOfFull: Joi.number().required(),
  solution: Joi.string().required(),
}).required();

const update = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  height: Joi.number().required(),
  width: Joi.number().required(),
  valueOfFull: Joi.number().required(),
  solution: Joi.string().required(),
  active: Joi.boolean().required(),
}).required();

module.exports = { create, update };
