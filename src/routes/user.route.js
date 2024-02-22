const express = require("express");
const { verifyToken } = require("../middlewares");
const userController = require("../controllers/userController");
const { uploadFormidable } = require("../middlewares/upload");
const userRoute = express.Router();

userRoute.get("/", verifyToken, userController.getUsers);
userRoute.patch("/", verifyToken, userController.updateUser);
userRoute.get("/signed-url", verifyToken, userController.getSignedUrl);
userRoute.get("/:id", verifyToken, userController.getUserById);
userRoute.post(
  "/upload",
  verifyToken,
  uploadFormidable,
  userController.uploadUser
);

userRoute.post("/likeProfile", verifyToken, userController.likedProfile);

module.exports = userRoute;
