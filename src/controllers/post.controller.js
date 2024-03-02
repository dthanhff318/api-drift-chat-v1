const httpStatus = require("http-status");
const s3Services = require("../services/s3.services");
const postServices = require("../services/post.services");
const commentServices = require("../services/comment.services");
const ApiError = require("../utilities/ApiError");

const postController = {
  getPosts: async (req, res) => {
    try {
      const { id } = req.infoUser;
      const { userId } = req.query;
      const posts = await postServices.getPostByUserId(userId || id);
      return res.status(httpStatus.OK).json(posts);
    } catch (err) {
      console.log(err);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
  },
  createPost: async (req, res) => {
    try {
      const { id } = req.infoUser;
      const { caption, fileNameList } = req.body;
      const imageList = [];
      for (const name of fileNameList) {
        const fileNameS3 = s3Services.getFileNameS3(name);
        const fileNameGen = `post_${id}_${fileNameS3}`;
        const filePathS3 = s3Services.getFilePathS3(fileNameGen);
        imageList.push(filePathS3);
      }
      await postServices.createPost({
        user: id,
        caption,
        images: imageList,
      });
      return res.status(httpStatus.OK).json();
    } catch (err) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
  },
  signedImagePost: async (req, res) => {
    try {
      const { id } = req.infoUser;
      const { imageList } = req.body;
      const getSignedImage = async (fileName, fileType) => {
        return await s3Services.getSignedURL(fileName, fileType);
      };
      const urlSignedList = [];
      for (const image of imageList) {
        const { fileName, fileType } = image;
        const cryptName = `post_${id}_${fileName}`;
        const signedImg = await getSignedImage(cryptName, fileType);
        urlSignedList.push(signedImg);
      }
      return res.status(httpStatus.OK).json(urlSignedList);
    } catch {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
  },
  likedPost: async (req, res) => {
    try {
      const { id } = req.infoUser;
      const { postId } = req.body;
      const postDoc = await postServices.getPostById(postId);
      if (!postDoc) {
        throw new ApiError(httpStatus.NOT_FOUND, "Post not exist");
      }
      const isLiked = postDoc?.stars?.includes(id);
      const postUpdate = await postServices.likeAndUnlikePost(
        postId,
        id,
        isLiked
      );
      return res.status(httpStatus.OK).json(postUpdate);
    } catch (err) {
      console.log(err);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
  },
  // Comment
  commentPost: async (req, res) => {
    try {
      const { id } = req.infoUser;
      const { post, content } = req.body;
      const comment = await commentServices.createComment({
        user: id,
        post,
        content,
      });
      return res.status(httpStatus.OK).json(comment);
    } catch (err) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
  },
  getCommentByPost: async (req, res) => {
    try {
      const { postId } = req.params;
      const comments = await commentServices.getCommentByPostId(postId);
      return res.status(httpStatus.OK).json(comments);
    } catch (err) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
  },
};

module.exports = postController;
