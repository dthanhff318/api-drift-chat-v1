const httpStatus = require("http-status");
const historyProfileServices = require("../services/historyProfile.services");
const { messageTypes, actionTypes } = require("../config/message");

const historyProfileController = {
  getHistoryByUserId: async (req, res) => {
    try {
      const { userId } = req.query;
      const histories = await historyProfileServices.getHistoryByOwnerId(
        userId
      );
      return res.status(httpStatus.OK).json(histories);
    } catch (err) {
      console.log(err);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
  },
};

module.exports = historyProfileController;
