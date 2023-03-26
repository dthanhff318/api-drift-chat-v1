const User = require("../models/users.model");

const authControllers = {
  loginWithFireBase: async (req, res) => {
    const { uid } = req.body;
    console.log(uid);
    const findUser = await User.findOne({ uid });
    if (findUser) {
      return res.json(findUser);
    } else {
      const newUser = new User(req.body);
      const infoNewUser = await newUser.save();
      return res.status(200).json(infoNewUser);
    }
  },
};

module.exports = authControllers;
