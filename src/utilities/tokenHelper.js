const jwt = require("jsonwebtoken");
const { jwtVar } = require("../config/jwt");
require("dotenv").config();

const genAccessToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESSTOKEN_KEY, {
    expiresIn: "20d",
  });
};

const genRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.REFRESHTOKEN_KEY, {
    expiresIn: "10h",
  });
};

const decodeToken = async (token) => {
  return jwt.verify(token, jwtVar.secretKey);
};

module.exports = {
  genAccessToken,
  genRefreshToken,
  decodeToken,
};
