const { HTTPStatusCode } = require("../constants");
const messageServices = require("../services/messageServices");
const pick = require("../utilities/pick");
const cloudinary = require("../config/cloudinary");

const messageController = {
  sendMessage: async (req, res) => {
    try {
      const { id } = req.infoUser;
      const { group, content } = req.body;
      const sendMess = await messageServices.createMessage(id, group, content);
      return res.status(HTTPStatusCode.OK).json(sendMess);
    } catch (err) {
      return res.status(HTTPStatusCode.BAD_REQUEST).json(err);
    }
  },
  getMessages: async (req, res) => {
    try {
      const { id } = req.infoUser;
      const { groupId } = req.query;
      const options = pick(req.query, ["sortBy", "limit", "page"]);
      const filter = { group: groupId };

      const listMessage = await messageServices.getMessages(filter, options);
      return res.status(HTTPStatusCode.OK).json(listMessage);
    } catch (err) {
      return res.status(HTTPStatusCode.BAD_REQUEST).json(err);
    }
  },
  uploadMessImage: async (req, res) => {
    try {
      const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
      };

      const file = req.file;
      const result = await cloudinary.uploader.upload(file.filepath, options);
      return res.status(HTTPStatusCode.OK).json(result);
    } catch (err) {
      console.log(err);
      return res.status(HTTPStatusCode.BAD_REQUEST).json(err);
    }
  },
};

module.exports = messageController;
