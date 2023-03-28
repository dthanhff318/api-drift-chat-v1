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

module.exports = {
  genAccessToken,
  genRefreshToken,
};
