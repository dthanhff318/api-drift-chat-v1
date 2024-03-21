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
    const cmtDoc = new Comment(data);
    const newCmt = await cmtDoc.save();
    return await newCmt.populate({
      path: "user",
      model: "User",
      select: "displayName photoUrl isOnline",
    });
  },
};

module.exports = commentServices;
