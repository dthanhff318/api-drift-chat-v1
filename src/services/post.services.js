const Post = require("../models/post.model");

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
};

module.exports = postServices;
