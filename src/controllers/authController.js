const { genAccessToken, genRefreshToken } = require("../utilities/tokenHelper");
const User = require("../models/users.model");
const { HTTPStatusCode } = require("../constants");
const Friend = require("../models/friends.model");

const authControllers = {
  loginWithFireBase: async (req, res) => {
    const { uid } = req.body;
    const findUser = await User.findOne({ uid });
    const accessToken = genAccessToken(uid);
    const refreshToken = genRefreshToken(uid);
    if (findUser) {
      return res
        .status(HTTPStatusCode.OK)
        .json({ ...findUser, accessToken, refreshToken });
    } else {
      const newUser = new User(req.body);
      const newFriends = new Friend({ uid });
      await newFriends.save();
      const infoNewUser = await newUser.save();

      return res
        .status(HTTPStatusCode.OK)
        .json({ ...infoNewUser, accessToken, refreshToken });
    }
  },
};

module.exports = authControllers;
