const express = require("express");
const { verifyToken } = require("../middlewares");
const friendController = require("../controllers/friendController");
const friendRoute = express.Router();

friendRoute.get("/", verifyToken, friendController.getInfoCommunication);

module.exports = friendRoute;
