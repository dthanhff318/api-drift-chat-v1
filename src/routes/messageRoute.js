const express = require("express");
const messageController = require("../controllers/sendMessageController");
const messageRoute = express.Router();

messageRoute.post("/send", messageController.sendMessage);

module.exports = messageRoute;
