const express = require("express");
const { verifyToken } = require("../middlewares");
const userController = require("../controllers/userController");
const { uploadFormidable } = require("../middlewares/upload");
const userRoute = express.Router();

userRoute.get("/", verifyToken, userController.getUsers);
userRoute.patch("/", verifyToken, userController.updateUser);
userRoute.get("/:id", verifyToken, userController.getUserById);
userRoute.post(
  "/avatar",
  verifyToken,
  uploadFormidable,
  userController.uploadAvatar
);
userRoute.post("/likeProfile", verifyToken, userController.likedProfile);

module.exports = userRoute;
