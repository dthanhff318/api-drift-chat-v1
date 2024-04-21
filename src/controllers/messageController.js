const pushNotification = require("../utilities/fcmNotify/fcmNotify");
const { HTTPStatusCode } = require("../constants");
const messageServices = require("../services/messageServices");
const pick = require("../utilities/pick");
const { uploadWithCloudinary } = require("../utilities/uploadHelper");
const groupServices = require("../services/groupServices");
const { getNameAndAvatarChat } = require("../utilities/func");

const messageController = {
  sendMessage: async (req, res) => {
    try {
      const { id } = req.infoUser;
      const sendMess = await messageServices.createMessage({
        ...req.body,
        senderId: id,
      });
      const group = await groupServices.getDetailGroup(req.body.group);
      const { nameGroup } = getNameAndAvatarChat(group, id);
      for (const member of group.members) {
        member.fcmToken &&
          pushNotification({
            title: `Dift Chat: ${nameGroup}`,
            body: req.body.content,
            token: member.fcmToken,
          });
      }
      return res.status(HTTPStatusCode.OK).json(sendMess);
    } catch (err) {
      return res.status(HTTPStatusCode.BAD_REQUEST).json(err);
    }
  },

  sendMessageWithImage: async (req, res) => {
    try {
      const { id } = req.infoUser;
      const file = req.file;
      const rawData = req.dataUpload;
      const result = await uploadWithCloudinary(file.filepath);
      const sendMess = await messageServices.createMessage({
        senderId: id,
        ...rawData,
        image: result.url,
      });
      return res.status(HTTPStatusCode.OK).json(sendMess);
    } catch (err) {
      console.log(err);
      return res.status(HTTPStatusCode.BAD_REQUEST).json(err);
    }
  },

  getMessages: async (req, res) => {
    try {
      const { groupId } = req.query;
      const options = pick(req.query, ["sortBy", "limit", "page"]);
      const filter = { group: groupId };
      const listMessage = await messageServices.getMessages(filter, options);
      return res.status(HTTPStatusCode.OK).json(listMessage);
    } catch (err) {
      console.log(err);
      return res.status(HTTPStatusCode.BAD_REQUEST).json(err);
    }
  },

  deleteMessage: async (req, res) => {
    try {
      const { id } = req.params;
      const dataUpdate = req.body;
      const message = await messageServices.updateMessage(id, dataUpdate);
      return res.status(HTTPStatusCode.OK).json(message);
    } catch (err) {
      return res.status(HTTPStatusCode.BAD_REQUEST).json(err);
    }
  },
};

module.exports = messageController;
