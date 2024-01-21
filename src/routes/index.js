const express = require("express");
const apiV1 = express.Router();
const authRoute = require("./authRoute");
const friendRoute = require("./friendRoute");
const messageRoute = require("./messageRoute");
const servicesRoute = require("./servicesRoute");
const groupRoute = require("./groupRoute");
const userRoute = require("./userRoute");
const settingRoute = require("./setting.route");

apiV1.use("/auth", authRoute);
apiV1.use("/friends", friendRoute);
apiV1.use("/services", servicesRoute);
apiV1.use("/user", userRoute);
apiV1.use("/message", messageRoute);
apiV1.use("/groups", groupRoute);
apiV1.use("/settings", settingRoute);

module.exports = apiV1;
