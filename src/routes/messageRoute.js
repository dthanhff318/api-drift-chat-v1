const express = require("express");
const messageController = require("../controllers/messageController");
const messageRoute = express.Router();
const { verifyToken } = require("../middlewares");

messageRoute.post("/send", verifyToken, messageController.sendMessage);
messageRoute.get("/", messageController.getMessage);

module.exports = messageRoute;
