const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const historyProfileSchema = new mongoose.Schema(
  {
    userTarget: {
      type: String,
      ref: "User",
      default: null,
    },
    lastVisited: [
      {
        type: String,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

historyProfileSchema.plugin(toJSON);
historyProfileSchema.plugin(paginate);

const Message = mongoose.model("HistoryProfile", historyProfileSchema);
module.exports = Message;
