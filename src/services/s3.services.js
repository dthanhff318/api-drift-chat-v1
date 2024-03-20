const aws = require("aws-sdk");
const { s3Config } = require("../config/s3");

const s3 = new aws.S3(s3Config);

const s3Services = {
  getSignedURL: async (key, fileType) => {
    const params = {
      Bucket: s3Config.bucket,
      Key: key,
      Expires: 60,
      ContentType: fileType,
    };

    return s3.getSignedUrl("putObject", params);
  },
  getFilePathS3: (fileName) => {
    return `https://${s3Config.bucket}.s3.${s3Config.region}.amazonaws.com/${fileName}`;
  },
  deleteS3File: async (fileName) => {
    const params = {
      Bucket: s3Config.bucket,
      Key: fileName,
    };
    return s3.deleteObject(params);
  },

  getFileNameS3: (s3Path) => {
    const items = s3Path.split("/");
    return items[items.length - 1];
  },
};

module.exports = s3Services;
