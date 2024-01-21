const express = require("express");
const { verifyToken } = require("../middlewares");
const { uploadFormidable } = require("../middlewares/upload");
const groupController = require("../controllers/groupController");

const groupRoute = express.Router();

groupRoute.get("/", verifyToken, groupController.getAllGroup);
groupRoute.get("/:id", verifyToken, groupController.getDetailGroup);
groupRoute.post("/create-group", verifyToken, groupController.createGroup);
groupRoute.patch("/:groupId", verifyToken, groupController.updateGroup);
groupRoute.patch(
  "/nick-name/:groupId",
  verifyToken,
  groupController.changeNickname
);
groupRoute.post(
  "/remove-member/:groupId",
  verifyToken,
  groupController.removeMember
);
groupRoute.post("/add-member/:groupId", verifyToken, groupController.addMember);
groupRoute.post(
  "/change-photo/:groupId",
  verifyToken,
  uploadFormidable,
  groupController.changePhoto
);

module.exports = groupRoute;
