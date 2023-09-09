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
  getMessages: async (group) => {
    const listMessage = await Message.find({ group });
    // .sort({ createdAt: -1 })
    //     .skip((pageNumber - 1) * limitNumber)
    //     .limit(limitNumber);
    return listMessage;
  },
};

module.exports = messageServices;
