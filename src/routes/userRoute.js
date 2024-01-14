const express = require("express");
const { verifyToken } = require("../middlewares");
const userController = require("../controllers/userController");
const { uploadFormidable } = require("../middlewares/upload");
const userRoute = express.Router();

userRoute.get("/", verifyToken, userController.getUser);
userRoute.patch("/", verifyToken, userController.updateUser);
userRoute.post(
  "/avatar",
  verifyToken,
  uploadFormidable,
  userController.uploadAvatar
);

module.exports = userRoute;
