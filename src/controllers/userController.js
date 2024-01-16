const httpStatus = require("http-status");
const userServices = require("../services/userServices");
const { uploadWithCloudinary } = require("../utilities/uploadHelper");

const userController = {
  getUser: async (req, res) => {
    try {
      const listUser = await userServices.getAllUser();
      return res.status(httpStatus.OK).json(listUser);
    } catch (err) {
      console.log(err);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
  },
  updateUser: async (req, res) => {
    try {
      const dataUpdate = req.body;
      const { id } = req.infoUser;
      const update = await userServices.updateUser({
        id,
        dataUpdate,
      });
      return res.status(httpStatus.OK).json(update);
    } catch (err) {
      console.log(err);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
  },
  uploadAvatar: async (req, res) => {
    try {
      const { id } = req.infoUser;
      const file = req.file;
      const upload = await uploadWithCloudinary(file.filepath);
      const user = await userServices.updateUser({
        id,
        dataUpdate: {
          photoUrl: upload.url,
        },
      });
      return res.status(httpStatus.OK).json(user);
    } catch (err) {
      console.log(err);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
  },
};

module.exports = userController;
