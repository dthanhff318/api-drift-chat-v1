const Message = require("../models/message.model");
const { HTTPStatusCode } = require("../constants");
const messageServices = require("../services/messageServices");

const messageController = {
  sendMessage: async (req, res) => {
    try {
      const { id } = req.infoUser;
      const { groupId, content } = req.body;
      const sendMess = await messageServices.createMessage(
        id,
        groupId,
        content
      );
      return res.status(HTTPStatusCode.OK).json(sendMess);
    } catch (err) {
      return res.status(HTTPStatusCode.BAD_REQUEST).json(err);
    }
  },
  getMessages: async (req, res) => {
    try {
      const { id } = req.infoUser;
      const { page, limit, groupId } = req.query;
      const pageNumber = parseInt(page, 10);
      const limitNumber = parseInt(limit, 10);

      const listMessage = await messageServices.getMessages(groupId);
      return res.status(HTTPStatusCode.OK).json(listMessage);
    } catch (err) {
      return res.status(HTTPStatusCode.BAD_REQUEST).json(err);
    }
  },
};

module.exports = messageController;
