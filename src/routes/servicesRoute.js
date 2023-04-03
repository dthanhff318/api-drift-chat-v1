const express = require("express");
const User = require("../models/users.model");
const servicesController = require("../controllers/servicesController");
const servicesRoute = express.Router();

servicesRoute.get("/users", servicesController.getUsers);
servicesRoute.get("/search", servicesController.searchUser);

module.exports = servicesRoute;
