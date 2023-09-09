const express = require("express");
const messageController = require("../controllers/sendMessageController");
const messageRoute = express.Router();
const { verifyToken } = require("../middlewares");

messageRoute.post("/send", verifyToken, messageController.sendMessage);
messageRoute.get("/", verifyToken, messageController.getMessage);

module.exports = messageRoute;
