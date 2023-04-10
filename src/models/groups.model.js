const mongoose = require("mongoose");

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
  message: [
    {
      type: String,
      ref: "Message",
    },
  ],
  create_by: {
    type: String,
    require: true,
  },
  listAdmin: [
    {
      type: String,
      ref: "User",
      require: true,
    },
  ],
});

const Group = mongoose.model("Group", groupSchema);
module.exports = Group;
