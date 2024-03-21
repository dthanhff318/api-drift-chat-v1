const mongoose = require("mongoose");
const logger = require("../config/logger");

const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://duythanh318:CaqougtuEbFwSUt2@chat-app.x13bb1s.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        wtimeoutMS: 10000,
      }
    )
    .then(() => logger.info("Connect DB success"))
    .catch((e) => logger.error(e))
    .finally(() => {});
};

module.exports = connectDB;
