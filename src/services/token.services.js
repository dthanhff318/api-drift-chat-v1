const Token = require("../models/token.model");
const { jwtVar } = require("../config/jwt");
const moment = require("moment");
const { tokenTypes } = require("../config/token");
const jwt = require("jsonwebtoken");

const tokenServices = {
  generateToken: (userId, expires, type, secret = jwtVar.secretKey) => {
    const payload = {
      id: userId,
      iat: moment().unix(),
      exp: expires.unix(),
      type,
    };
    return jwt.sign(payload, secret);
  },

  generateAuthTokens: async (user) => {
    const accessTokenExpires = moment().add(
      jwtVar.accessExpirationMinutes,
      "minutes"
    );
    const refreshTokenExpires = moment().add(
      jwtVar.refreshExpirationDays,
      "days"
    );

    const accessToken = tokenServices.generateToken(
      user.id,
      accessTokenExpires,
      tokenTypes.ACCESS
    );

    const refreshToken = tokenServices.generateToken(
      user.id,
      refreshTokenExpires,
      tokenTypes.REFRESH
    );
    await tokenServices.saveToken(
      refreshToken,
      user.id,
      refreshTokenExpires,
      tokenTypes.REFRESH
    );

    return {
      access: accessToken,
      refresh: refreshToken,
    };
  },
  saveToken: async (token, userId, expires, type) => {
    const tokenDoc = await Token.create({
      token,
      user: userId,
      expires: expires.toDate(),
      type,
    });

    return tokenDoc;
  },
};

module.exports = tokenServices;
