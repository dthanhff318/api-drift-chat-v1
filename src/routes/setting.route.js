const express = require("express");
const { verifyToken } = require("../middlewares");
const settingController = require("../controllers/setting.controller");
const settingRoute = express.Router();

settingRoute.get("/", settingController.getSetting);
settingRoute.post("/", settingController.createSetting);

module.exports = settingRoute;
