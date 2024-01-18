const mongoose = require("mongoose");

const themeModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

// Tell Mongoose to include virtual properties when converting documents to JSON
themeModel.set("toJSON", { virtuals: true });

const Theme = mongoose.model("Theme", themeModel);
module.exports = Theme;
