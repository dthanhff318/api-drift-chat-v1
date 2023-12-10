const formidable = require("formidable");
const { convertBodyFormidable } = require("../utilities/func");
const uploadFormidable = (req, res, next) => {
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    const { image } = files;
    req.file = image[0];
    req.dataUpload = convertBodyFormidable(fields);
    return next();
  });
};

module.exports = {
  uploadFormidable,
};
