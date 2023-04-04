var jwt = require("jsonwebtoken");
require("dotenv").config();

const genAccessToken = (uid) => {
  return jwt.sign({ uid }, process.env.ACCESSTOKEN_KEY, {
    expiresIn: "1h",
  });
};

const genRefreshToken = (uid) => {
  return jwt.sign({ uid }, process.env.REFRESHTOKEN_KEY, {
    expiresIn: "7h",
  });
};

const decodeToken = async (token) => {
  return jwt.verify(token, process.env.ACCESSTOKEN_KEY);
};

module.exports = {
  genAccessToken,
  genRefreshToken,
  decodeToken,
};
