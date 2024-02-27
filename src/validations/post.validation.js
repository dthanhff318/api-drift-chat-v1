const Joi = require("joi");

const createPost = {
  body: Joi.object().keys({
    caption: Joi.string().required(),
    fileNameList: Joi.array().items(Joi.string()).required(),
  }),
};

module.exports = {
  createPost,
};
