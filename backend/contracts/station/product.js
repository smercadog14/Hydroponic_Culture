const Joi = require("joi");

const create = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  img: Joi.string(),
  adequateParams: Joi.array().items(Joi.number()).required(),
});

const update = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  img: Joi.string(),
  adequateParams: Joi.array().items(Joi.number()).required(),
  active: Joi.boolean().required(),
});

module.exports = { create, update };
