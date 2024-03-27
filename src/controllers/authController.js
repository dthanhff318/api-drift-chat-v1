const { decodeToken } = require("../utilities/tokenHelper");
const User = require("../models/users.model");
const { HTTPStatusCode } = require("../constants");
const httpStatus = require("http-status");
const Friend = require("../models/friends.model");
const authServices = require("../services/authServices");
const { nanoid } = require("nanoid");
const tokenSevices = require("../services/token.services");
const livekitServices = require("../services/livekit.services");
const userServices = require("../services/userServices");

const authControllers = {
  loginWithFireBase: async (req, res) => {
    try {
      const { uid } = req.body;
      const findUser = await User.findOne({ uid });
      let userData;
      if (findUser) {
        userData = findUser;
      } else {
        const shortId = nanoid(6);
        const userObj = new User({ ...req.body, inviteId: shortId });
        const user = await userObj.save();
        const friendObj = new Friend({ userId: user.id });
        friendObj.save();
        userData = user;
      }
      const { access, refresh } = await tokenSevices.generateAuthTokens(
        userData.id,
        userData.displayName
      );
      const dataResponse = {
        user: userData,
        token: {
          accessToken: access,
          refreshToken: refresh,
        },
      };
      await userServices.updateUser({
        id: userData.id,
        dataUpdate: {
          isOnline: true,
        },
      });
      return res.status(HTTPStatusCode.OK).json(dataResponse);
    } catch (err) {
      console.log(err);
      return res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json(err);
    }
  },
  refreshToken: async (req, res) => {
    try {
      const refreshTk = req.body.refresh;
      const decodeTokenValue = await decodeToken(refreshTk);
      const { access, refresh } = await tokenSevices.generateAuthTokens(
        decodeTokenValue.id,
        decodeTokenValue.name
      );
      return res.status(HTTPStatusCode.OK).json({
        accessToken: access,
        refreshToken: refresh,
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
      console.log(err);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
  },
  genTokenLivekit: (req, res) => {
    try {
      const { name } = req.infoUser;
      console.log(req.infoUser);
      const { room } = req.query;
      const token = livekitServices.createToken({ name, room });
      return res.status(HTTPStatusCode.OK).json(token);
    } catch (err) {
      console.log(err);
      return res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json(err);
    }
  },
};

module.exports = authControllers;
