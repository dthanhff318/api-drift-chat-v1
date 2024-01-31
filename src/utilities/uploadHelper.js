const { cloudinary, defaulOptions } = require("../config/cloudinary");

const uploadWithCloudinary = async (filePath) => {
  const resultUpload = await cloudinary.uploader.upload(
    filePath,
    defaulOptions
  );
  console.log(resultUpload);
  return resultUpload;
};

module.exports = {
  uploadWithCloudinary,
};
