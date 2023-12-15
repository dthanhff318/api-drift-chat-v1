const Message = require("../models/message.model");

const messageServices = {
  createMessage: async (messBody) => {
    const dataMess = new Message(messBody);
    const newMessage = await dataMess.save();
    return newMessage;
  },
  getMessages: async (filter, options) => {
    const listMessage = await Message.paginate(filter, {
      ...options,
      populate: 'replyMessage',
    });
    return listMessage;
  },
  getNewestMessage: async (idGroup) => {
    const newestMessage = await Message.findOne({
      group: idGroup,
    }).sort({ createdAt: -1 });
    return newestMessage;
  },
};

module.exports = messageServices;
