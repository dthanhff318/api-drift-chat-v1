const Friend = require("../models/friends.model");
const User = require("../models/users.model");
const { HTTPStatusCode } = require("../constants");

const userServices = {
  getAllUser: async (req, res) => {
    const { id } = req.infoUser;
    const listUser = await User.find({ id: { $ne: id } });
    return listUser;
  },
};

module.exports = userServices;
