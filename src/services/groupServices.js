const Friend = require("../models/friends.model");
const User = require("../models/users.model");
const { HTTPStatusCode } = require("../constants");
const Group = require("../models/groups.model");

const groupServices = {
  createGroup: async (members, name = "", admins = "", isGroup = false) => {
    const objGroup = new Group({
      name,
      members,
      admins,
      isGroup,
    });
    const newGroupChat = await objGroup.save();
    return newGroupChat;
  },
};

module.exports = groupServices;
