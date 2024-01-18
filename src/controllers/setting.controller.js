const httpStatus = require("http-status");
const settingServices = require("../services/setting.services");

const settingController = {
  createSetting: async (req, res) => {
    try {
    } catch (err) {
      console.log(err);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
  },
  getSetting: async (req, res) => {
    try {
      const themes = await settingServices.getTheme();
      const settings = {
        themes,
      };
      return res.status(httpStatus.OK).json(settings);
    } catch (err) {
      console.log(err);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
  },
};

module.exports = settingController;
