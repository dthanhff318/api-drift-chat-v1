const Message = require("../models/message.model");
const { HTTPStatusCode } = require("../constants");

const messageController = {
  sendMessage: async (req, res) => {
    try {
      const senderUid = req.infoUser.uid;
      const { groupId, content } = req.body;
      const newMess = new Message({
        senderId: senderUid,
        group: groupId,
        content: content,
      });
      const resMess = await newMess.save();
      console.log({ resMess });
      console.log("hihi", resMess.content);
      return res.status(HTTPStatusCode.OK).json(resMess);
    } catch (err) {
      return res.status(HTTPStatusCode.BAD_REQUEST).json(err);
    }
  },
  getMessage: async (req, res) => {
    try {
      const { page, limit, groupId } = req.query;

      const pageNumber = parseInt(page, 10);
      const limitNumber = parseInt(limit, 10);

      const listMessage = await Message.find({ group: groupId })
        .sort({ createdAt: -1 })
        .skip((pageNumber - 1) * limitNumber)
        .limit(limitNumber);
      return res.status(HTTPStatusCode.OK).json(listMessage);
    } catch (err) {
      return res.status(HTTPStatusCode.BAD_REQUEST).json(err);
    }
  },
};

module.exports = messageController;
