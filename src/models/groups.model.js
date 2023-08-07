const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  members: [
    {
      type: String,
      ref: "User",
      require: true,
    },
  ],
  listAdmin: [
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
});

groupSchema.plugin(toJSON);

const Group = mongoose.model("Group", groupSchema);
module.exports = Group;
