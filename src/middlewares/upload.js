const formidable = require("formidable");

const uploadFormidable = (req, res, next) => {
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    const { image } = files;
    req.file = image[0];
    return next();
  });
};

module.exports = {
  uploadFormidable,
};
