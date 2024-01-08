const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

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
});

groupSchema.plugin(toJSON);

groupSchema.pre("save", async function (next) {
  const group = this;
  if (user.isModified("members")) {
    user.password = await bcrypt.hash(user.password, salt);
  }
  next();
});

const Group = mongoose.model("Group", groupSchema);
module.exports = Group;
