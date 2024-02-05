const express = require("express");
const { verifyToken } = require("../middlewares");
const friendController = require("../controllers/friendController");
const { friendValidation } = require("../validations/index");
const validate = require("../middlewares/validate");
const friendRoute = express.Router();

friendRoute.get("/", verifyToken, friendController.getInfoCommunication);
friendRoute.post(
  "/add",
  verifyToken,
  validate(friendValidation.sendAddFriend),
  friendController.addFriend
);
friendRoute.post("/accept", verifyToken, friendController.acceptFriend);

friendRoute.post("/send-request", verifyToken, friendController.sendRequest);

module.exports = friendRoute;
