const express = require("express");
const authControllers = require("../controllers/authController");
const authRoute = express.Router();

authRoute.post("/login/firebase", authControllers.loginWithFireBase);
authRoute.post("/refresh", authControllers.refreshToken);

module.exports = authRoute;
