const httpStatus = require("http-status");
const Friend = require("../models/friends.model");
const friendServices = require("../services/friendServices");
const ApiError = require("../utilities/ApiError");
const groupServices = require("../services/groupServices");

const friendController = {
  getInfoCommunication: async (req, res) => {
    try {
      const { id } = req.infoUser;
      const infoFriendUser = await friendServices.getDataFriendUserDetail(id);
      return res.status(httpStatus.OK).json(infoFriendUser);
    } catch (err) {
      console.log(err);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
  },
  // Send request add friend or cancel request
  sendFriendRequest: async (req, res) => {
    try {
      const { friendId } = req.body;
      const { id } = req.infoUser;
      const friendRequest =
        await friendServices.handleSendAndUnsendFriendRequest({
          userSend: id,
          userReceive: friendId,
        });
      return res.status(httpStatus.OK).json(friendRequest);
    } catch (err) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
  },
  acceptFriend: async (req, res) => {
    try {
      const { friendId } = req.body;
      const { id } = req.infoUser;
      if (id === friendId) {
        return res
          .status(httpStatus.BAD_REQUEST)
          .json("Can not send request to yourself");
      }
      const dataFriendReceive = await friendServices.getDataFriendUser(id);
      const dataFriendSender = await friendServices.getDataFriendUser(friendId);
      if (!dataFriendReceive || !dataFriendSender) {
        return res.status(httpStatus.NOT_FOUND).json("Not found data friend");
      }
      // Check if 2 people have added friend
      if (
        dataFriendReceive.listFriend.find((e) => e.id === friendId) ||
        dataFriendSender.listFriend.find((e) => e.id === id)
      ) {
        return res
          .status(httpStatus.BAD_REQUEST)
          .json("You are already friends");
      }
      await friendServices.acceptFriendData(
        id,
        { listAccept: friendId },
        { listFriend: friendId }
      );
      await friendServices.acceptFriendData(
        friendId,
        { listRequest: id },
        { listFriend: id }
      );
      await groupServices.createGroup({
        admins: [id, friendId],
        members: [id, friendId],
      });
      return res.status(httpStatus.OK).json("Accept friend success");
    } catch (err) {
      console.log(err);
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json("Something error");
    }
  },
};

module.exports = friendController;
