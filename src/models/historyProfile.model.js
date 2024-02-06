const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");
const { listHistoryActionTypes } = require("../config/history");

const historyProfileSchema = new mongoose.Schema(
  {
    historyOwner: {
      type: String,
      ref: "User",
    },
    userTarget: {
      type: String,
      ref: "User",
      default: null,
    },
    // lastVisited: [
    //   {
    //     type: String,
    //     ref: "User",
    //   },
    // ],
    actionHistoryType: {
      type: String,
      enum: listHistoryActionTypes,
    },
  },
  {
    timestamps: true,
  }
);

historyProfileSchema.plugin(toJSON);
historyProfileSchema.plugin(paginate);

const HistoryProfile = mongoose.model("HistoryProfile", historyProfileSchema);
module.exports = HistoryProfile;
