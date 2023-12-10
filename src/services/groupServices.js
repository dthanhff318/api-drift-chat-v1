const { HTTPStatusCode } = require("../constants");
const Group = require("../models/groups.model");
const messageServices = require("./messageServices");
const moment = require("moment");

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
    const sortedGroups = extraDataGroups.sort(
      (a, b) =>
        moment(b.newestMess?.createdAt ?? "1970-01-01T00:00:00.000Z") -
        moment(a.newestMess?.createdAt ?? "1970-01-01T00:00:00.000Z")
    );
    return sortedGroups;
  },
  updateGroup: async (id, updateBody) => {
    const update = await Group.findByIdAndUpdate(id, updateBody, {
      new: true,
    });
    console.log(id);
    return update;
  },
};

module.exports = groupServices;
