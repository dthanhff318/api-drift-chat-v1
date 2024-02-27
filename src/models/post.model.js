const mongoose = require("mongoose");

const postModel = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    ref: " User",
  },
  caption: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  stars: [
    {
      type: String,
      ref: "User",
    },
  ],
});

// Tell Mongoose to include virtual properties when converting documents to JSON
postModel.set("toJSON", { virtuals: true });

const Post = mongoose.model("Post", postModel);
module.exports = Post;
