const Post = require("../models/Post.model");

const postServices = {
  getPostByUserId: async (id) => {
    const posts = await Post.find({ user: id });
    return posts;
  },
  createPost: async (data) => {
    const post = new Post(data);
    return await post.save();
  },
};

module.exports = postServices;
