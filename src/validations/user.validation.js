const Joi = require("joi");

const getUserById = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

const updateUser = {};

module.exports = {
  getUserById,
};
