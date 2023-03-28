const express = require("express");
const apiV1 = express.Router();
const authRoute = require("./authRoute");
const friendRoute = require("./friendRoute");

apiV1.use("/auth", authRoute);
apiV1.use("/friend", friendRoute);

module.exports = apiV1;
