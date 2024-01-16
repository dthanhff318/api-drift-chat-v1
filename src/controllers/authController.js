const {
  genAccessToken,
  genRefreshToken,
  decodeToken,
} = require("../utilities/tokenHelper");
const User = require("../models/users.model");
const { HTTPStatusCode } = require("../constants");
const httpStatus = require("http-status");
const Friend = require("../models/friends.model");
const authServices = require("../services/authServices");
const { nanoid } = require("nanoid");
const tokenSevices = require("../services/token.services");

const authControllers = {
  loginWithFireBase: async (req, res) => {
    const { uid } = req.body;
    const findUser = await User.findOne({ uid });
    if (findUser) {
      const { access, refresh } = await tokenSevices.generateAuthTokens(
        findUser
      );
      const dataResponse = {
        user: findUser,
        token: {
          accessToken: access,
          refreshToken: refresh,
        },
      };
      return res.status(HTTPStatusCode.OK).json(dataResponse);
    } else {
      const shortId = nanoid(6);
      const userObj = new User({ ...req.body, inviteId: shortId });
      const user = await userObj.save();
      const friendObj = new Friend({ userId: user.id });
      friendObj.save();
      const { access, refresh } = await tokenSevices.generateAuthTokens(user);
      const dataResponse = {
        user,
        token: {
          accessToken: access,
          refreshToken: refresh,
        },
      };
      return res.status(HTTPStatusCode.OK).json(dataResponse);
    }
  },
  refreshToken: async (req, res) => {
    try {
      const refreshTk = req.body.refresh;
      const decodeTokenValue = await decodeToken(refreshTk, false);
      const accessToken = genAccessToken(decodeTokenValue.uid);
      const refreshToken = genRefreshToken(decodeTokenValue.uid);
      return res.status(HTTPStatusCode.OK).json({
        accessToken,
        refreshToken,
      });
    } catch (err) {
      return res.status(HTTPStatusCode.FORBIDDEN).json();
    }
  },
  getCurrentUser: async (req, res) => {
    try {
      const { id } = req.infoUser;
      const user = await authServices.getUserById(id);
      return res.status(HTTPStatusCode.OK).json(user);
    } catch (err) {
      return res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json(err);
    }
  },
  logout: async (req, res) => {
    try {
      const { id } = req.infoUser;
      const { refreshToken } = req.body;
      await authServices.logout({ id, refreshToken });
      res.status(httpStatus.NO_CONTENT).send();
    } catch (err) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
  },
};

module.exports = authControllers;
