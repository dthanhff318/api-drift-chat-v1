const httpStatus = require("http-status");
const settingServices = require("../services/setting.services");
const { messageTypes, actionTypes } = require("../config/message");

const historyProfileController = {
  getHistoryByUserId: async (req, res) => {
    try {
      const { id } = req.infoUser;
      const historyDocs = 
    } catch (err) {
      console.log(err);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
  },
};

module.exports = historyProfileController;
