const httpStatus = require("http-status");
const settingServices = require("../services/setting.services");
const { messageTypes, actionTypes } = require("../config/message");

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
      const commonData = {
        messageTypes,
        actionGroupTypes: actionTypes,
      };
      const themes = await settingServices.getTheme();
      const settings = {
        themes,
        commonData,
      };
      return res.status(httpStatus.OK).json(settings);
    } catch (err) {
      console.log(err);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
  },
};

module.exports = settingController;
