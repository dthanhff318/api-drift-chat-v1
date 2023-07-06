const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  senderId: {
    type: String,
    required: true,
    ref: "User",
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "Group",
  },
  content: {
    type: String,
    require: true,
  },
  createdAt: { type: Date, default: Date.now() },
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
