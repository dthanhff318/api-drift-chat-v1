const { HTTPStatusCode } = require("../constants");
const Group = require("../models/groups.model");
const messageServices = require("./messageServices");

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
    const extraDataGroups = await Promise.all(
      groups.map(async (e) => {
        const newestMess = await messageServices.getNewestMessage(e.id);
        return { ...e._doc, id: e.id, newestMess };
      })
    );
    return extraDataGroups;
  },
};

module.exports = groupServices;
