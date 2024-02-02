const express = require("express");
const { verifyToken } = require("../middlewares");
const historyProfileController = require("../controllers/historyProfile.controller");
const historyProfileRoute = express.Router();

historyProfileRoute.get(
  "/",
  verifyToken,
  historyProfileController.getHistoryByUserId
);

module.exports = historyProfileRoute;
