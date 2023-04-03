const User = require("../models/users.model");
const { HTTPStatusCode } = require("../constants");
const { decodeToken } = require("../utilities/tokenHelper");
const Friend = require("../models/friends.model");

const friendController = {
  getInfoCommunication: async (req, res) => {
    try {
      const accessToken = req.headers.authorization.split(" ")[1];
      const data = decodeToken(accessToken);
      const infoCm = await Friend.findOne({ uid: data.uid });
      // Check infoCommunication is created
      if (infoCm) {
        return res.status(HTTPStatusCode.OK).json(infoCm);
      } else {
        const newInfoCommunication = new Friend({ uid: data.uid });
        const initInfoCm = await newInfoCommunication.save();
        return res.status(HTTPStatusCode.OK).json(initInfoCm);
      }
    } catch (err) {
      return res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json(err);
    }
  },
};

module.exports = friendController;
