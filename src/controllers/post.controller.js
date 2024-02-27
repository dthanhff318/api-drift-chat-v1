const httpStatus = require("http-status");
const s3Services = require("../services/s3.services");
const postServices = require("../services/post.services");
const commentServices = require("../services/comment.services");

const postController = {
  getPosts: async (req, res) => {
    try {
      const { id } = req.infoUser;
      const { userId } = req.params;
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
        const fileName = `post_${id}_${name}`;
        const filePathS3 = s3Services.getFilePathS3(fileName);
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
};

module.exports = postController;
