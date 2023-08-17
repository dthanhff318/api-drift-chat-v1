const mongoose = require("mongoose");

const friendSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  listFriend: {
    type: [{ type: String, ref: "User" }],
    required: true,
    default: [],
  },
  listRequest: {
    type: [{ type: String, ref: "User" }],
    required: true,
    default: [],
  },
  listAccept: {
    type: [{ type: String, ref: "User" }],
    required: true,
    default: [],
  },
  listBlock: {
    type: [{ type: String, ref: "User" }],
    required: true,
    default: [],
  },
});

// Tell Mongoose to include virtual properties when converting documents to JSON
friendSchema.set("toJSON", { virtuals: true });

const Friend = mongoose.model("Friend", friendSchema);
module.exports = Friend;
