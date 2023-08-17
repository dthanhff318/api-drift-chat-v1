const express = require("express");
const { verifyToken } = require("../middlewares");
const userController = require("../controllers/userController");
const userRoute = express.Router();

userRoute.get("/", verifyToken, userController.getAllUser);

module.exports = userRoute;
