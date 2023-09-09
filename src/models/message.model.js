const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const messageSchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

messageSchema.plugin(toJSON);

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
