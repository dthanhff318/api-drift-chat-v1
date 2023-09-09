const Friend = require("../models/friends.model");

const friendServices = {
  getDataFriendUser: async (id) => {
    const dataFriend = await Friend.findOne({ userId: id }).populate({
      path: "listFriend listAccept listRequest listBlock",
      model: "User",
      select: "displayName photoUrl lastActive",
    });
    return dataFriend;
  },
  addFriendData: async (id, dataAdd) => {
    const updateFriendData = await Friend.findOneAndUpdate(
      { userId: id },
      {
        $push: dataAdd,
      },
      { new: true }
    );
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
  // cancelRequestAddFriend: async (id, dataCancel) => {
  //   const updateFriendData = await Friend.findOneAndUpdate(
  //     { userId: id },
  //     {
  //       $pull: dataCancel,
  //     },
  //     { new: true }
  //   );
  //   return updateFriendData;
  // },
};

module.exports = friendServices;
