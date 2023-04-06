const express = require("express");
const { verifyToken } = require("../middlewares");
const friendController = require("../controllers/friendController");
const friendRoute = express.Router();

friendRoute.get("/", verifyToken, friendController.getInfoCommunication);
friendRoute.post("/send-add", verifyToken, friendController.sendRqAddFriend);

module.exports = friendRoute;
