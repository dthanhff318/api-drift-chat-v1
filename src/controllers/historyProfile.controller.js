const httpStatus = require("http-status");
const historyProfileServices = require("../services/historyProfile.services");
const { messageTypes, actionTypes } = require("../config/message");

const historyProfileController = {
  getHistoryByUserId: async (req, res) => {
    try {
      const { id } = req.infoUser;
      return await historyProfileServices.getHistoryByOwnerId(id);
    } catch (err) {
      console.log(err);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
  },
};

module.exports = historyProfileController;
