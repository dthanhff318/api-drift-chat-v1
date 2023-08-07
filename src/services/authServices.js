const User = require("../models/users.model");

const authServices = {
  getUserById: async (id) => {
    const user = await User.findById(id);
    return user;
  },
};

module.exports = authServices;
