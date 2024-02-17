const httpStatus = require("http-status");
const historyProfileServices = require("../services/historyProfile.services");
const userServices = require("../services/userServices");
const { uploadWithCloudinary } = require("../utilities/uploadHelper");
const { historyActionTypes } = require("../config/history");

const userController = {
  getUsers: async (req, res) => {
    try {
      const listUser = await userServices.getAllUser();
      return res.status(httpStatus.OK).json(listUser);
    } catch (err) {
      console.log(err);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
  },
  getUserById: async (req, res) => {
    try {
      const { id } = req.params;
      const { id: currentUserId } = req.infoUser;
      const userDoc = await userServices.getUserById(id);
      if (currentUserId !== id) {
        await historyProfileServices.createHistory({
          historyOwner: currentUserId,
          userTarget: id,
          actionHistoryType: historyActionTypes.VISIT,
        });
      }
      return res.status(httpStatus.OK).json(userDoc);
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
  uploadUser: async (req, res) => {
    try {
      const { id } = req.infoUser;
      const file = req.file;
      const { type } = req.dataUpload;
      const upload = await uploadWithCloudinary(file.filepath);
      const user = await userServices.updateUser({
        id,
        dataUpdate: {
          [type]: upload.url,
        },
      });
      return res.status(httpStatus.OK).json(user);
    } catch (err) {
      console.log(err);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
  },

  likedProfile: async (req, res) => {
    try {
      const { id } = req.infoUser;
      const { user } = req.body;
      const findUser = await userServices.getUserById(user);
      if (!findUser)
        return res.status(httpStatus.NOT_FOUND).json("User not found");
      const { likedProfile } = findUser;
      const isLiked = likedProfile.includes(id);
      const userDoc = await userServices.updateLikeProfile(id, user, isLiked);
      await historyProfileServices.createHistory({
        historyOwner: user,
        userTarget: id,
        actionHistoryType: isLiked
          ? historyActionTypes.UNLIKE
          : historyActionTypes.LIKE,
      });
      return res.status(httpStatus.OK).json(userDoc);
    } catch (err) {
      console.log(err);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
  },
};

module.exports = userController;
