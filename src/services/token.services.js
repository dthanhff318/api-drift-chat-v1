const Token = require("../models/token.model");
const { jwtVar } = require("../config/jwt");
const moment = require("moment");
const { tokenTypes } = require("../config/token");
const jwt = require("jsonwebtoken");

const tokenServices = {
  generateToken: (id, name, expires, type, secret = jwtVar.secretKey) => {
    const payload = {
      id,
      name,
      iat: moment().unix(),
      exp: expires.unix(),
      type,
    };
    return jwt.sign(payload, secret);
  },

  generateAuthTokens: async (id, name) => {
    const accessTokenExpires = moment().add(
      jwtVar.accessExpirationMinutes,
      "minutes"
    );
    const refreshTokenExpires = moment().add(
      jwtVar.refreshExpirationDays,
      "days"
    );

    const accessToken = tokenServices.generateToken(
      id,
      name,
      accessTokenExpires,
      tokenTypes.ACCESS
    );

    const refreshToken = tokenServices.generateToken(
      id,
      name,
      refreshTokenExpires,
      tokenTypes.REFRESH
    );
    await tokenServices.saveToken(
      refreshToken,
      id,
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
