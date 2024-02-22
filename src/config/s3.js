const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "../../.env") });
const s3Config = {
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY,
  region: process.env.S3_REGION,
  bucket: process.env.S3_BUCKET,
  signatureVersion: 'v4',
};

module.exports = { s3Config };
