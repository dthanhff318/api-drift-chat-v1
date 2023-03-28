const mongoose = require("mongoose");

const friendSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
    unique: true,
  },
  listFriend: {
    type: [{ type: String, ref: "User" }],
    default: [],
  },
  listBlock: {
    type: [{ type: String, ref: "User" }],
    default: [],
  },
});

// Tell Mongoose to include virtual properties when converting documents to JSON
friendSchema.set("toJSON", { virtuals: true });

const Friend = mongoose.model("Friend", friendSchema);
module.exports = Friend;
