const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const settingPerUserSchema = new mongoose.Schema({
  user: {
    type: String,
    ref: "User",
    require: true,
  },
  nickname: {
    type: String,
    default: null,
  },
});

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    default: null,
  },
  members: [
    {
      type: String,
      ref: "User",
      require: true,
    },
  ],
  admins: [
    {
      type: String,
      ref: "User",
    },
  ],
  isGroup: {
    type: Boolean,
    require: true,
    default: false,
  },
  unread: {
    type: Number,
    default: 0,
  },
  photo: {
    type: String,
    default: null,
  },
  theme: {
    type: String,
    ref: "Theme",
    default: "DEFAULT_BLACK",
  },

  setting: [settingPerUserSchema],
});

settingPerUserSchema.plugin(toJSON);
groupSchema.plugin(toJSON);

groupSchema.pre("save", async function (next) {
  const group = this;
  next();
});

const Group = mongoose.model("Group", groupSchema);
module.exports = Group;
