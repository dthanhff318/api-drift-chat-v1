const Comment = require("../models/comment.model");

const commentServices = {
  getCommentByPostId: async (post) => {
    const listComment = await Comment.find({ post }).populate({
      path: "user",
      model: "User",
      select: "displayName photoUrl lastActive uid isOnline",
    });
    return listComment;
  },
  createComment: async (data) => {
    const post = new Comment(data);
    return await post.save();
  },
};

module.exports = commentServices;
