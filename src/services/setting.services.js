const Theme = require("../models/theme.model");

const settingServices = {
  getTheme: async (req, res) => {
    return await Theme.find();
  },
};

module.exports = settingServices;
