const express = require("express");
const servicesController = require("../controllers/servicesController");
const servicesRoute = express.Router();

servicesRoute.get("/users", servicesController.getUsers);
servicesRoute.get("/search", servicesController.searchUser);

module.exports = servicesRoute;
