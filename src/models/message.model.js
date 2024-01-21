const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");
const { listTypeMessage, messageTypes } = require("../config/message");

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
      default: null,
    },
    image: {
      type: String,
      default: null,
    },
    replyMessage: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      ref: "Message",
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      enum: listTypeMessage,
      default: messageTypes.USER,
    },
  },
  {
    timestamps: true,
  }
);

messageSchema.plugin(toJSON);
messageSchema.plugin(paginate);

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
