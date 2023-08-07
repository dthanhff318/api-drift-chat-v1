const Group = require("../models/groups.model");
const { HTTPStatusCode } = require("../constants");
const Friend = require("../models/friends.model");

const friendController = {
  getInfoCommunication: async (req, res) => {
    try {
      const uid = req.infoUser.uid;
      const infoCm = await (
        await Friend.findOne({ uid })
      ).populate({
        path: "listFriend listAccept listRequest listBlock",
        model: "User",
        select: "displayName photoUrl lastActive",
        localField: "uid",
        foreignField: "uid",
      });
      if (infoCm) {
        return res.status(HTTPStatusCode.OK).json(infoCm);
      } else {
        return res.status(HTTPStatusCode.BAD_REQUEST).json("Not found");
      }
    } catch (err) {
      return res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json(err);
    }
  },
  // Send request add friend or cancel request
  addFriend: async (req, res) => {
    const {} = req.infoUser;
  },
};

module.exports = friendController;
