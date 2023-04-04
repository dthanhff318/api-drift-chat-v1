const express = require("express");
const { verifyToken } = require("../middlewares");
const servicesController = require("../controllers/servicesController");
const servicesRoute = express.Router();

servicesRoute.get("/users", verifyToken, servicesController.getUsers);
servicesRoute.get("/search", servicesController.searchUser);

module.exports = servicesRoute;
