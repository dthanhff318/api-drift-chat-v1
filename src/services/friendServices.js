const Friend = require("../models/friends.model");
const ApiError = require("../utilities/ApiError");
const httpStatus = require("http-status");

const friendServices = {
  getDataFriendUserDetail: async (id) => {
    const dataFriend = await Friend.findOne({ userId: id }).populate({
      path: "listFriend listAccept listRequest listBlock",
      model: "User",
      select: "displayName photoUrl lastActive isOnline",
    });
    return dataFriend;
  },
  getDataFriendUser: async (id) => {
    return await Friend.findOne({ userId: id });
  },
  addFriendData: async (id, dataAdd) => {
    const updateFriendData = await Friend.findOneAndUpdate(
      { userId: id },
      {
        $push: dataAdd,
      },
      { new: true }
    ).lean();
    return updateFriendData;
  },
  cancelRequestAddFriend: async (id, dataCancel) => {
    const updateFriendData = await Friend.findOneAndUpdate(
      { userId: id },
      {
        $pull: dataCancel,
      },
      { new: true }
    );
    return updateFriendData;
  },
  // SendFriendRequest or CancelRequest
  handleSendAndUnsendFriendRequest: async (data) => {
    const { userSend, userReceive } = data;
    if (userSend === userReceive) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Can not send request to yourself"
      );
    }
    const userSendFriend = await friendServices.getDataFriendUser(userSend);
    const userReceiveFriend = await friendServices.getDataFriendUser(
      userReceive
    );

    if (!userSendFriend || !userReceiveFriend) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Data friend user not found");
    }
    if (userReceiveFriend.listAccept.includes(userSend)) {
      const userSendData = await friendServices.cancelRequestAddFriend(
        userSend,
        {
          listRequest: userReceive,
        }
      );
      await friendServices.cancelRequestAddFriend(userReceive, {
        listAccept: userSend,
      });
      return userSendData;
    } else {
      const userSendData = await friendServices.addFriendData(userSend, {
        listRequest: userReceive,
      });
      await friendServices.addFriendData(userReceive, { listAccept: userSend });
      return userSendData;
    }
  },
  // Accept Friend
  acceptFriendData: async (id, dataAccept, dataFriend) => {
    const updateFriendData = await Friend.findOneAndUpdate(
      { userId: id },
      {
        $push: dataFriend,
        $pull: dataAccept,
      },
      { new: true }
    );
    return updateFriendData;
  },
  unfriend: async (id, friendId) => {
    await Friend.findOneAndUpdate(
      { userId: id },
      {
        $pull: { listFriend: friendId },
      }
    );
    await Friend.findOneAndUpdate(
      { userId: friendId },
      {
        $pull: { listFriend: id },
      }
    );
  },
};

module.exports = friendServices;
