const express = require("express");
const apiV1 = express.Router();
const authRoute = require("./authRoute");

apiV1.use("/auth", authRoute);

module.exports = apiV1;
