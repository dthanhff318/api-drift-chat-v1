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
  getGroups: async (id, q = "") => {
    const groups = await Group.find({ members: { $in: [id] } }).populate({
      path: "members",
      model: "User",
      select: "displayName photoUrl lastActive uid ",
    });
    return groups;
  },
};

module.exports = groupServices;
