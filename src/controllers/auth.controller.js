const { genAccessToken, genRefreshToken } = require("../utilities/tokenHelper");
const User = require("../models/users.model");

const authControllers = {
  loginWithFireBase: async (req, res) => {
    const { uid } = req.body;
    const findUser = await User.findOne({ uid });
    const accessToken = genAccessToken(uid);
    const refreshToken = genRefreshToken(uid);
    if (findUser) {
      return res.json({ ...findUser, accessToken, refreshToken });
    } else {
      const newUser = new User(req.body);
      const infoNewUser = await newUser.save();
      return res
        .status(200)
        .json({ ...infoNewUser, accessToken, refreshToken });
    }
  },
};

module.exports = authControllers;
