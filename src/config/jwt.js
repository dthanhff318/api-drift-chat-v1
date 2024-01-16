const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "../../.env") });
const jwtVar = {
  secretKey: process.env.JWT_SECRET_KEY,
  accessExpirationMinutes: process.env.ACCESS_TOKEN_EXPIRED_MIN,
  refreshExpirationDays: process.env.REFRESH_TOKEN_EXPIRED_DAY,
};

module.exports = { jwtVar };
