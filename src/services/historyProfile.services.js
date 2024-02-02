const HistoryProfile = require("../models/historyProfile.model");

const historyProfileServices = {
  createHistory: async (data) => {
    const { historyOwner, userTarget, actionHistoryType } = data;
    const historyObj = new HistoryProfile({
      historyOwner,
      userTarget,
      actionHistoryType,
    });
    return await historyObj.save();
  },
  getHistoryByOwnerId: async (id) => {
    return await HistoryProfile.find({ historyOwner: id });
  },
};

module.exports = historyProfileServices;
