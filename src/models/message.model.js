const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  senderId: {
    type: String,
    required: true,
    ref: "User",
  },
  receiverId: {
    type: String,
    required: true,
    ref: "User",
  },
  content: {
    type: String,
    require: true,
  },
  createdAt: { type: Date, default: Date.now() },
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
