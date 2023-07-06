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
  typeGroup: {
    type: Boolean,
    require: true,
  },
});

groupSchema.plugin(toJSON);

const Group = mongoose.model("Group", groupSchema);
module.exports = Group;
