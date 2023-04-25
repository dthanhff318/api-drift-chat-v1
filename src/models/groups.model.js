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
  },
  listAdmin: [
    {
      type: String,
      ref: "User",
      require: true,
    },
  ],
  typeGroup:{
    type:Boolean,
    require:true
  }
});

const Group = mongoose.model("Group", groupSchema);
module.exports = Group;
