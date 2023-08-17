const Joi = require("joi");

const sendAddFriend = {
  body: Joi.object().keys({
    friendId: Joi.string().required(),
  }),
};

module.exports = {
  sendAddFriend,
};
