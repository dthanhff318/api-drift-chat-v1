const Server = require("socket.io").Server;
const logger = require("../config/logger");

require("dotenv").config();

let ioInstance;
const createIoInstance = (httpServer) => {
  ioInstance = new Server(httpServer, {
    cors: {
      origin: process.env.URL_CLIENT,
      credentials: true,
    },
  });
  logger.info(`Created Socket`);
  return ioInstance;
};

const getIO = () => {
  if (!ioInstance) {
    return null;
  } else {
    return ioInstance;
  }
};
module.exports = { ioInstance, createIoInstance, getIO };
