const Message = require("../models/message.model");
const { HTTPStatusCode } = require("../constants");

const messageController = {
  sendMessage: async (req, res) => {
    try {
      const newMess = new Message(req.body);
      const resMess = await newMess.save();
      res.status(HTTPStatusCode.OK).json(resMess);
    } catch (err) {
      res.status(HTTPStatusCode.BAD_REQUEST).json(err);
    }
  },
  getMessage: async (req, res) => {
    try {
      const { page = 1, limit = 10, groupId } = req.query;
      const calculatePage = (page - 1) * limit;
      const messages = await Message.find({
        group: groupId,
      })
        .sort({ createdAt: -1 })
        .skip(calculatePage)
        .limit(Number(limit))
        .exec();

      return res.status(HTTPStatusCode.OK).json(messages);
    } catch (err) {
      res.status(HTTPStatusCode.BAD_REQUEST).json(err);
    }
  },
};

module.exports = messageController;
