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
};

module.exports = messageController;
