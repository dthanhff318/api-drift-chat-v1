const Message = require("../models/message.model");
const { messageTypes } = require("../config/message");
const messageServices = {
  createMessage: async (messBody) => {
    const dataMess = new Message(messBody);
    const newMessage = await dataMess.save();
    return newMessage;
  },
  getMessages: async (filter, options) => {
    const listMessage = await Message.paginate(filter, {
      ...options,
      populate: "replyMessage",
    });
    return listMessage;
  },
  getNewestMessage: async (idGroup) => {
    const newestMessage = await Message.findOne({
      group: idGroup,
      type: { $ne: messageTypes.COMMON },
    }).sort({ createdAt: -1 });
    return newestMessage;
  },
  updateMessage: async (id, data) => {
    const messUpdate = await Message.findByIdAndUpdate(id, data, {
      new: true,
    });
    return messUpdate;
  },
};

module.exports = messageServices;
