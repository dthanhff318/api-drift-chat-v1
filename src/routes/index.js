const express = require("express");
const apiV1 = express.Router();
const authRoute = require("./authRoute");
const friendRoute = require("./friendRoute");
const servicesRoute = require("./servicesRoute");

apiV1.use("/auth", authRoute);
apiV1.use("/friend", friendRoute);
apiV1.use("/services", servicesRoute);

module.exports = apiV1;
