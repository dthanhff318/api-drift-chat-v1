const express = require("express");
const authControllers = require("../controllers/authController");
const { verifyToken } = require("../middlewares");
const authRoute = express.Router();

authRoute.post("/login/firebase", authControllers.loginWithFireBase);
authRoute.post("/refresh", authControllers.refreshToken);
authRoute.get("/current-user", verifyToken, authControllers.getCurrentUser);

module.exports = authRoute;
