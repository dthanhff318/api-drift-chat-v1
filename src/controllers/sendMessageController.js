const Message = require("../models/message.model");
const Group = require("../models/groups.model");
const { HTTPStatusCode } = require("../constants");

const messageController = {
  sendMessage: async (req, res) => {
    try {
      const senderId = req.infoUser.uid;
      const newMess = { ...req.body.contentMess, senderId };
      await Group.findByIdAndUpdate(
        req.body.groupId,
        { message: newMess },
        { new: true },
        { upsert: true }
      );
      res.status(HTTPStatusCode.OK).json(newMess);
    } catch (err) {
      res.status(HTTPStatusCode.BAD_REQUEST).json(err);
    }
  },
};

module.exports = messageController;
