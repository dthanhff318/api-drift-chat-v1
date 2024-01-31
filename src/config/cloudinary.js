const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "drift-chat",
  api_key: "432889269835143",
  api_secret: "1kZW72kRSEJUlnuZ3X-O_fG1Wcs",
});

const defaulOptions = {
  use_filename: true,
  unique_filename: false,
  overwrite: true,
};

module.exports = {
  cloudinary,
  defaulOptions,
};
