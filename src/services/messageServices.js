const Message = require("../models/message.model");

const messageServices = {
  createMessage: async (senderId, group, content) => {
    const dataMess = new Message({
      senderId,
      group,
      content,
    });
    const newMessage = await dataMess.save();
    return newMessage;
  },
  getMessages: async (filter, options) => {
    const listMessage = await Message.paginate(filter, {
      ...options,
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
