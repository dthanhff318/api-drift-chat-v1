const express = require("express");
const apiV1 = express.Router();
const authRoute = require("./authRoute");
const friendRoute = require("./friendRoute");
const messageRoute = require("./messageRoute");
const servicesRoute = require("./servicesRoute");

apiV1.use("/auth", authRoute);
apiV1.use("/friend", friendRoute);
apiV1.use("/services", servicesRoute);
apiV1.use("/message", messageRoute);

module.exports = apiV1;
