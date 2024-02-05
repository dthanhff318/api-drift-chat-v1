const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");
const {
  friendStatusTypes,
  listFriendStatusTypes,
} = require("../config/friend");

const friendSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: listFriendStatusTypes,
      default: friendStatusTypes.NEW,
    },
    userSend: {
      type: String,
      ref: "User",
      default: null,
    },
    userReceive: {
      type: String,
      ref: "User",
      default: null,
    },
  },

  {
    timestamps: true,
  }
);

friendSchema.plugin(toJSON);
friendSchema.plugin(paginate);

const Friend = mongoose.model("HistoryProfile", friendSchema);
module.exports = Friend;
