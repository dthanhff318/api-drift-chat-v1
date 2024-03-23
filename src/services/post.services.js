const Post = require("../models/post.model");
const s3Services = require("../services/s3.services");

const postServices = {
  getPostByUserId: async (id) => {
    const posts = await Post.find({ user: id }).populate({
      path: "user",
      model: "User",
      select: "displayName photoUrl lastActive uid isOnline",
    });
    return posts;
  },
  getPostById: async (id) => {
    const post = await Post.findById(id);
    return post;
  },
  getPostDetail: async (id) => {
    const post = await (
      await Post.findById(id)
    ).populate({
      path: "user",
      model: "User",
      select: "displayName photoUrl",
    });
    return post;
  },
  createPost: async (data) => {
    const post = new Post(data);
    return await post.save();
  },
  likeAndUnlikePost: async (postId, userId, isLiked) => {
    const updatePost = await Post.findByIdAndUpdate(
      postId,
      isLiked ? { $pull: { stars: userId } } : { $push: { stars: userId } },
      {
        new: true,
      }
    );
    return updatePost;
  },
  updatePost: async (postId, postUpdate) => {
    return await Post.findByIdAndUpdate(postId, postUpdate, { new: true });
  },
  deletePost: async (postId) => {
    const post = await Post.findById(postId).exec();
    if (post) {
      const { images } = post;
      for (const imgs of images) {
        await s3Services.deleteS3File(s3Services.getFileNameS3(imgs));
      }
      await Post.findByIdAndDelete(postId);
    }
  },
};

module.exports = postServices;
