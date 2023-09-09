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
};

module.exports = groupController;
