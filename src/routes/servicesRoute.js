const express = require("express");
const servicesController = require("../controllers/servicesController");
const servicesRoute = express.Router();

servicesRoute.get("/users", servicesController.getUsers);

module.exports = servicesRoute;
