const express = require("express");
const { genAccessToken } = require("../utilities/tokenHelper");
const friendRoute = express.Router();

friendRoute.get("/", (req, res) => {
  const aTk = genAccessToken("hi");
  res.json(aTk);
});

module.exports = friendRoute;
