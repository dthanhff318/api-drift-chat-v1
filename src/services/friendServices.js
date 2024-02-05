const Friend = require("../models/friend.model");
const {friendStatusTypes} = require("../config/friend")

const friendServices = {
  sendRequest: async (friendId) => {
    await Friend.findByIdAndUpdate(friendId, {
      status : friendStatusTypes.
    });
  },
};

module.exports = friendServices;
