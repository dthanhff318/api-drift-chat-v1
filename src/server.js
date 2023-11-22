const express = require("express");
const cors = require("cors");
const createServer = require("http").createServer;
const Server = require("socket.io").Server;
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const connect = require("./mongoDbConfig/mongoConfig");
const apiV1 = require("./routes");
const logger = require("./config/logger");
const ApiError = require("./utilities/ApiError");
const httpStatus = require("http-status");
const { errorConverter, errorHandler } = require("./middlewares/error");

require("dotenv").config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.URL_CLIENT,
    credentials: true,
  },
});
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(bodyParser.json());

connect();

app.get("/", () => {
  console.log(1);
});
app.use("/v1", apiV1);

// Send 404 error for unknon api
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, ERR_MESSAGE.NOT_FOUND));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

httpServer.listen(process.env.PORT, process.env.BASE_URL, () => {
  logger.info(`Server is running in Port ${process.env.PORT}`);
});

io.on("connection", (socket) => {
  let disconectTimeout;
  console.log(socket.rooms);

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`${socket.id} join room ${roomId}`);
  });

  socket.on("sendMessage", (data) => {
    // socket.broadcast.to(data.roomId).emit("sendMessage", data);
    socket.broadcast.emit("sendMessage", data);
  });

  socket.on("leftRoom", (roomId) => {
    socket.leave(roomId);
    console.log(`${socket.id} leave room ${roomId}`);
  });

  socket.on("disconnect", () => {});

  socket.on("connect", () => {
    console.log("One user reconnect");
  });
});
