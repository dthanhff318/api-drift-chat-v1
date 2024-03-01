const express = require("express");
const postController = require("../controllers/post.controller");
const { verifyToken } = require("../middlewares");
const postRoute = express.Router();

postRoute.get("/", verifyToken, postController.getPosts);
postRoute.post("/", verifyToken, postController.createPost);
postRoute.post(
  "/signed-image-post",
  verifyToken,
  postController.signedImagePost
);
postRoute.post("/comment", verifyToken, postController.commentPost);
postRoute.get("/comment/:postId", verifyToken, postController.getCommentByPost);

module.exports = postRoute;
