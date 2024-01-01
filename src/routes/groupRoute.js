const express = require("express");

const { verifyToken } = require("../middlewares");
const groupController = require("../controllers/groupController");

const groupRoute = express.Router();

groupRoute.get("/", verifyToken, groupController.getAllGroup);
groupRoute.post("/create-group", verifyToken, groupController.createGroup);
groupRoute.patch("/:groupId", verifyToken, groupController.updateGroup);

module.exports = groupRoute;
