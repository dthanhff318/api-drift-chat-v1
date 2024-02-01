const { cloudinary, defaulOptions } = require("../config/cloudinary");

const uploadWithCloudinary = async (filePath) => {
  const resultUpload = await cloudinary.uploader.upload(
    filePath,
    defaulOptions
  );
  return resultUpload;
};

module.exports = {
  uploadWithCloudinary,
};
