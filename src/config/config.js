const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });

const env = {
  NODE_ENV: process.env.NODE_ENV,
};

module.exports = {
  env,
};
