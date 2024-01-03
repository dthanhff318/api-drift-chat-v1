const express = require("express");
const messageController = require("../controllers/messageController");
const messageRoute = express.Router();
const { verifyToken } = require("../middlewares");
const { uploadFormidable } = require("../middlewares/upload");

messageRoute.get("/", verifyToken, messageController.getMessages);
messageRoute.post("/send", verifyToken, messageController.sendMessage);
messageRoute.post(
  "/send-with-image",
  verifyToken,
  uploadFormidable,
  messageController.sendMessageWithImage
);
messageRoute.patch("/delete/:id", verifyToken, messageController.deleteMessage);

module.exports = messageRoute;
