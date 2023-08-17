const Group = require("../models/groups.model");
const { HTTPStatusCode } = require("../constants");
const Friend = require("../models/friends.model");
const friendServices = require("../services/friendServices");
const ApiError = require("../utilities/ApiError");

const friendController = {
  getInfoCommunication: async (req, res) => {
    try {
      const { id } = req.infoUser;
      // const infoFriendUser = await (
      //   await Friend.findById(id)
      // ).populate({
      //   path: "listFriend listAccept listRequest listBlock",
      //   model: "User",
      //   select: "displayName photoUrl lastActive",
      //   localField: "uid",
      //   foreignField: "uid",
      // });
      const infoFriendUser = await friendServices.getDataFriendUser(id);
      if (infoFriendUser) {
        return res.status(HTTPStatusCode.OK).json(infoFriendUser);
      } else {
        return res.status(HTTPStatusCode.BAD_REQUEST).json("Not found");
      }
    } catch (err) {
      return res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json(err);
    }
  },
  // Send request add friend or cancel request
  addFriend: async (req, res) => {
    try {
      const { friendId } = req.body;
      const { id } = req.infoUser;
      if (id === friendId) {
        // return res
        //   .status(HTTPStatusCode.BAD_REQUEST)
        //   .json("Can not send request to yourself");
        throw new ApiError(
          HTTPStatusCode.BAD_REQUEST,
          "Can not send request to yourself"
        );
      }
      const dataFriendSender = await friendServices.getDataFriendUser(id);
      const dataFriendReceive = await friendServices.getDataFriendUser(
        friendId
      );
      if (!dataFriendReceive && !dataFriendSender) {
        return res
          .status(HTTPStatusCode.NOT_FOUND)
          .json("Not found data friend");
      }
      await friendServices.addFriendData(id, { listRequest: friendId });
      await friendServices.addFriendData(friendId, { listAccept: id });
      return res.status(HTTPStatusCode.OK).json("Send request success");
    } catch (err) {
      console.log(err);
      return res
        .status(HTTPStatusCode.INTERNAL_SERVER_ERROR)
        .json("Something error");
    }
  },
};

module.exports = friendController;
