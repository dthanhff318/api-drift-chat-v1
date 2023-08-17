const Friend = require("../models/friends.model");

const friendServices = {
  getDataFriendUser: async (id) => {
    const dataFriend = await Friend.findOne({ userId: id });
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
};

module.exports = friendServices;
