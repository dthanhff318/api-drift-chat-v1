const express = require("express");
const { verifyToken } = require("../middlewares");
const friendController = require("../controllers/friendController");
const friendRoute = express.Router();

friendRoute.get("/", verifyToken, friendController.getInfoCommunication);
friendRoute.post("/add-friend", verifyToken, friendController.addFriend);
// friendRoute.post(
//   "/accept-friend",
//   verifyToken,
//   friendController.acceptFrRequest
// );

module.exports = friendRoute;
