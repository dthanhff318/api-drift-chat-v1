const express = require("express");
const { verifyToken } = require("../middlewares");
const friendController = require("../controllers/friendController");
const { friendValidation } = require("../validations/index");
const validate = require("../middlewares/validate");
const friendRoute = express.Router();

friendRoute.get("/", verifyToken, friendController.getInfoCommunication);
friendRoute.post(
  "/send-friend-request",
  verifyToken,
  validate(friendValidation.sendAddFriend),
  friendController.sendFriendRequest
);
friendRoute.post("/accept", verifyToken, friendController.acceptFriend);

module.exports = friendRoute;
