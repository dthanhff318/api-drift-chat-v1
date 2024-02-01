const Friend = require("../models/friends.model");
const User = require("../models/users.model");
const { HTTPStatusCode } = require("../constants");

const userServices = {
  getAllUser: async (req, res) => {
    const { id } = req.infoUser;
    const listUser = await User.find({ id: { $ne: id } });
    return listUser;
  },
  updateUser: async (data) => {
    const { id, dataUpdate } = data;
    const user = await User.findByIdAndUpdate(id, dataUpdate, {
      new: true,
    });
    return user;
  },
  getUserById: async (id) => {
    return await User.findById(id);
  },
  updateLikeProfile: async (userAction, userTarget, isLike) => {
    return await User.findByIdAndUpdate(
      userTarget,
      isLike
        ? {
            $pull: {
              likedProfile: userAction,
            },
          }
        : {
            $push: {
              likedProfile: userAction,
            },
          },
      {
        new: true,
      }
    );
  },
};

module.exports = userServices;
