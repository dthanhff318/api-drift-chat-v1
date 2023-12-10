const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dehyltryf",
  api_key: "551392444219214",
  api_secret: "Y5ZHQRN3TWLign1aoIbujCzABUE",
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
