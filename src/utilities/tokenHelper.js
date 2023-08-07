var jwt = require("jsonwebtoken");
require("dotenv").config();

const genAccessToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESSTOKEN_KEY, {
    expiresIn: "5h",
  });
};

const genRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.REFRESHTOKEN_KEY, {
    expiresIn: "10h",
  });
};

const decodeToken = async (token, isAccess = true) => {
  return jwt.verify(
    token,
    isAccess ? process.env.ACCESSTOKEN_KEY : process.env.REFRESHTOKEN_KEY
  );
};

module.exports = {
  genAccessToken,
  genRefreshToken,
  decodeToken,
};
