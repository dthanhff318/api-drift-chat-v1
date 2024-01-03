const groupServices = require("../services/groupServices");
const { HTTPStatusCode } = require("../constants/index");
const Group = require("../models/groups.model");

const groupController = {
  getAllGroup: async (req, res) => {
    try {
      const { id } = req.infoUser;
      const groups = await groupServices.getGroups(id, "");

      if (groups.length === 0) {
        return res
          .status(HTTPStatusCode.NOT_FOUND)
          .json({ message: "No group found" });
      } else {
        return res.status(HTTPStatusCode.OK).json(groups);
      }
    } catch (err) {
      console.log(err);
      return res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json(err);
    }
  },
  updateGroup: async (req, res) => {
    try {
      const { groupId } = req.params;
      const updateBody = req.body;
      const updatedGroup = await groupServices.updateGroup(groupId, updateBody);
      return res.status(HTTPStatusCode.OK).json(updatedGroup);
    } catch (err) {
      console.log(err);
      return res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json(err);
    }
  },
  createGroup: async (req, res) => {
    try {
      const { id } = req.infoUser;
      const { name, membersId } = req.body;
      const group = await groupServices.createGroup({
        members: [...membersId, id],
        name,
        admins: [id],
        isGroup: true,
      });
      return res.status(HTTPStatusCode.OK).json(group);
    } catch (err) {
      console.log(err);
      return res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json(err);
    }
  },
  getDetailGroup: async (req, res) => {
    try {
      const group = await groupServices.getDetailGroup();
    } catch (err) {}
  },
};

module.exports = groupController;
