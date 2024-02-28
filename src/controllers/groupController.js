const groupServices = require("../services/groupServices");
const { uploadWithCloudinary } = require("../utilities/uploadHelper");
const messageServices = require("../services/messageServices");
const { messageTypes, actionTypes } = require("../config/message");
const httpStatus = require("http-status");
const userServices = require("../services/userServices");

const groupController = {
  getAllGroup: async (req, res) => {
    try {
      const { id } = req.infoUser;
      const groups = await groupServices.getGroups(id, "");
      return res.status(httpStatus.OK).json(groups);
    } catch (err) {
      console.log(err);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
  },
  updateGroup: async (req, res) => {
    try {
      const { id } = req.infoUser;
      const { groupId } = req.params;
      const updateBody = req.body;
      const updatedGroup = await groupServices.updateGroup(groupId, updateBody);
      if (updateBody.name) {
        await messageServices.createMessage({
          senderId: id,
          group: groupId,
          type: messageTypes.COMMON,
          actionType: actionTypes.CHANGE_NAME_GROUP,
          contentAction: updateBody.name,
        });
      }
      return res.status(httpStatus.OK).json(updatedGroup);
    } catch (err) {
      console.log(err);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
  },
  createGroup: async (req, res) => {
    try {
      const { id } = req.infoUser;
      const { name, membersId } = req.body;
      const group = await groupServices.createGroup({
        members: [...membersId, id],
        name,
        admins: [id],
        isGroup: true,
      });
      return res.status(httpStatus.OK).json(group);
    } catch (err) {
      console.log(err);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
  },
  getDetailGroup: async (req, res) => {
    try {
      const { id } = req.params;
      const group = await groupServices.getDetailGroup(id);
      return res.status(httpStatus.OK).json(group);
    } catch (err) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
  },
  changeNickname: async (req, res) => {
    try {
      const { id } = req.infoUser;
      const { userId, nickname } = req.body;
      const { groupId } = req.params;
      await groupServices.updateNicknameInGroup({
        id: groupId,
        user: userId,
        nickname,
      });
      await messageServices.createMessage({
        senderId: id,
        group: groupId,
        type: messageTypes.COMMON,
        actionType: actionTypes.CHANGE_NICKNAME,
        targetUser: userId,
        contentAction: nickname,
      });
      return res.status(httpStatus.OK).json(null);
    } catch (err) {
      console.log(err);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
  },
  removeMember: async (req, res) => {
    try {
      const { id } = req.infoUser;
      const { member } = req.body;
      const { groupId } = req.params;
      const user = await userServices.getUserById(member);
      if (!user) return res.status(httpStatus.NOT_FOUND).json("User not found");
      await groupServices.removeMemberInGroup({
        groupId,
        member,
      });
      await messageServices.createMessage({
        senderId: id,
        group: groupId,
        type: messageTypes.COMMON,
        actionType: actionTypes.REMOVE,
        targetUser: member,
        contentAction: user.displayName,
      });
      res.status(httpStatus.NO_CONTENT).send();
    } catch (err) {
      console.log(err);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
  },
  addMember: async (req, res) => {
    try {
      const { id } = req.infoUser;
      const { members } = req.body;
      const { groupId } = req.params;
      await groupServices.addMemberInGroup({
        groupId,
        members,
      });
      for (const idMember of members) {
        await messageServices.createMessage({
          senderId: id,
          group: groupId,
          type: messageTypes.COMMON,
          actionType: actionTypes.ADD,
          targetUser: idMember,
        });
      }
      res.status(httpStatus.NO_CONTENT).send();
    } catch (err) {
      console.log(err);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
  },
  changePhoto: async (req, res) => {
    try {
      const { id } = req.infoUser;
      const { groupId } = req.params;
      const file = req.file;
      const upload = await uploadWithCloudinary(file.filepath);
      await groupServices.updateGroup(groupId, {
        photo: upload.url,
      });
      await messageServices.createMessage({
        senderId: id,
        group: groupId,
        type: messageTypes.COMMON,
        actionType: actionTypes.CHANGE_PHOTO_GROUP,
      });
      res.status(httpStatus.NO_CONTENT).send();
    } catch (err) {
      console.log(err);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
  },
  leaveGroup: async (req, res) => {
    try {
      const { id } = req.infoUser;
      const { groupId } = req.params;
      const user = await userServices.getUserById(id);
      if (!user) return res.status(httpStatus.NOT_FOUND).json("User not found");
      await groupServices.removeMemberInGroup({
        groupId,
        member: id,
      });
      await messageServices.createMessage({
        senderId: id,
        group: groupId,
        type: messageTypes.COMMON,
        actionType: actionTypes.LEAVE,
        contentAction: user.displayName,
      });
      res.status(httpStatus.NO_CONTENT).send();
    } catch (err) {
      console.log(err);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
  },
};

module.exports = groupController;
