const User = require("../models/users.model");
const { HTTPStatusCode } = require("../constants");

const servicesController = {
  getUsers: async (req, res) => {
    const listUsers = await User.find({});
    return res.status(HTTPStatusCode.OK).json(listUsers);
  },
};

module.exports = servicesController;
