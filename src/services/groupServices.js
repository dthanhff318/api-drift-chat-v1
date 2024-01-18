const { HTTPStatusCode } = require("../constants");
const Group = require("../models/groups.model");
const messageServices = require("./messageServices");
const moment = require("moment");

const groupServices = {
  createGroup: async (data) => {
    const { members, name = "", admins = "", isGroup = false } = data;
    const genDefaultSetting = members.map((e) => ({
      user: e,
      nickname: "",
      theme: null,
    }));
    const objGroup = new Group({
      name,
      members,
      admins,
      isGroup,
      setting: genDefaultSetting,
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
    return update;
  },
  getDetailGroup: async (id) => {
    const group = await Group.findById(id).populate({
      path: "members admins",
      model: "User",
      select: "displayName photoUrl lastActive uid ",
    });

    return group;
  },
  updateNicknameInGroup: async (data) => {
    const { id, user, nickname } = data;
    const group = await Group.findById(id).lean();
    const { setting } = group;
    console.log(group);
    const updateSetting = setting.map((s) =>
      user === s.user ? { ...s, nickname } : s
    );
    await Group.findByIdAndUpdate(id, { setting: updateSetting });
  },
  removeMemberInGroup: async (data) => {
    const { groupId, member } = data;
    const removeUser = await Group.findByIdAndUpdate(
      groupId,
      {
        $pull: { members: member, setting: { user: member } },
      },
      {
        new: true,
      }
    );
    return removeUser;
  },
};

module.exports = groupServices;
