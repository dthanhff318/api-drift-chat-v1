const Server = require("socket.io").Server;
require("dotenv").config();

let ioInstance;
const createIoInstance = (httpServer) => {
  ioInstance = new Server(httpServer, {
    cors: {
      origin: process.env.URL_CLIENT,
      credentials: true,
    },
  });
  return ioInstance;
};
module.exports = { ioInstance, createIoInstance };
