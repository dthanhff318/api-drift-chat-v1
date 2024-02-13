const express = require("express");
const apiV1 = express.Router();
const authRoute = require("./auth.route");
const friendRoute = require("./friend.route");
const messageRoute = require("./message.route");
const servicesRoute = require("./services.route");
const groupRoute = require("./group.route");
const userRoute = require("./user.route");
const settingRoute = require("./setting.route");
const historyProfileRoute = require("./historyProfile.route");

apiV1.use("/auth", authRoute);
apiV1.use("/friends", friendRoute);
apiV1.use("/services", servicesRoute);
apiV1.use("/user", userRoute);
apiV1.use("/message", messageRoute);
apiV1.use("/groups", groupRoute);
apiV1.use("/settings", settingRoute);
apiV1.use("/history-profile", historyProfileRoute);

module.exports = apiV1;
