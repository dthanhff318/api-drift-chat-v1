const {
  genAccessToken,
  genRefreshToken,
  decodeToken,
} = require("../utilities/tokenHelper");
const User = require("../models/users.model");
const { HTTPStatusCode } = require("../constants");
const { userServices } = require("../services/userServices");
const userController = {
  getAllUser: async (req, res) => {
    try {
      const listUser = await userServices.getAllUser()
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = userController;
