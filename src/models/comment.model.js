const mongoose = require("mongoose");

const commentModel = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    ref: " User",
  },
  post: {
    type: String,
    required: true,
    ref: "Post",
  },
  content: {
    type: String,
    required: true,
  },
});

// Tell Mongoose to include virtual properties when converting documents to JSON
commentModel.set("toJSON", { virtuals: true });

const Comment = mongoose.model("Comment", commentModel);
module.exports = Comment;
