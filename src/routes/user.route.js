const express = require("express");
const { verifyToken } = require("../middlewares");
const userController = require("../controllers/userController");
const userValidation = require("../validations/user.validation");
const validate = require("../middlewares/validate");
const userRoute = express.Router();

userRoute.get("/", verifyToken, userController.getUsers);
userRoute.patch("/", verifyToken, userController.updateUser);
userRoute.get("/signed-url", verifyToken, userController.getSignedUrl);
userRoute.get(
  "/:id",
  verifyToken,
  validate(userValidation.getUserById),
  userController.getUserById
);
userRoute.post("/upload", verifyToken, userController.uploadUser);

userRoute.post("/likeProfile", verifyToken, userController.likedProfile);

module.exports = userRoute;
