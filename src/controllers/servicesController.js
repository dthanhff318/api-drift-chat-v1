const User = require("../models/users.model");
const { HTTPStatusCode } = require("../constants");

const servicesController = {
  getUsers: async (req, res) => {
    try {
      const senderUid = req.infoUser.uid;
      const { q = "" } = req.query;
      const listUsers = await User.find({
        $and: [
          {
            $or: [
              {
                displayName: { $regex: q, $options: "i" },
              },
              { inviteId: { $regex: q, $options: "i" } },
            ],
          },
          {
            uid: { $ne: senderUid },
          },
        ],
      });

      return res.status(HTTPStatusCode.OK).json(listUsers);
    } catch (err) {
      console.log(err);
    }
  },
  searchUser: async (req, res) => {
    const query = req.query.q;
    if (!query) {
      return res.status(400).json({ error: "Missing query parameter q" });
    }
    const users = await User.find({
      displayName: { $regex: query, $options: "i" },
    });
    res.status(200).json(users);
  },
};

module.exports = servicesController;
