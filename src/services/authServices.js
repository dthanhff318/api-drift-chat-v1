const User = require("../models/users.model");
const Token = require("../models/token.model");
const httpStatus = require("http-status");
const { tokenTypes } = require("../config/token");
const userServices = require("./userServices");

const authServices = {
  getUserById: async (id) => {
    const user = await User.findById(id);
    return user;
  },
  logout: async (data) => {
    const { id, refreshToken } = data;
    const refreshTokenDoc = await Token.findOne({
      token: refreshToken,
      type: tokenTypes.REFRESH,
      user: id,
    });
    if (!refreshTokenDoc) {
      throw new ApiError(httpStatus.NOT_FOUND, "Logout error");
    }
    await userServices.updateUser({
      id,
      dataUpdate: {
        lastActive: Date.now(),
        isOnline: false,
      },
    });
    await refreshTokenDoc.deleteOne();
  },
};

module.exports = authServices;
