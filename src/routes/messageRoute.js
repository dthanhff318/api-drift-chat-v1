const express = require("express");
const messageController = require("../controllers/messageController");
const messageRoute = express.Router();
const { verifyToken } = require("../middlewares");
const { uploadFormidable } = require("../middlewares/upload");

messageRoute.post("/send", verifyToken, messageController.sendMessage);
messageRoute.patch(
  "/send/upload",
  //   verifyToken,
  uploadFormidable,
  messageController.uploadMessImage
);
messageRoute.get("/", verifyToken, messageController.getMessages);

module.exports = messageRoute;
