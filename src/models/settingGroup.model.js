const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const settingGroupSchema = new mongoose.Schema({
  group: {
    type: String,
    require: true,
    ref: "User",
  },
  members: [
    {
      type: String,
      ref: "User",
      require: true,
    },
  ],
});

settingGroupSchema.plugin(toJSON);

const SettingGroup = mongoose.model("SettingGroup", settingGroupSchema);
module.exports = SettingGroup;
