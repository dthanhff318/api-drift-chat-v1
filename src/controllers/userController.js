const httpStatus = require("http-status");
const { userServices } = require("../services/userServices");

const userController = {
  getUser: async (req, res) => {
    try {
      const listUser = await userServices.getAllUser();
      return res.httpStatus(httpStatus.OK).json(listUser);
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = userController;
