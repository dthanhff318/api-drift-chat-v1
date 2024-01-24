const express = require("express");
const authControllers = require("../controllers/authController");
const { verifyToken } = require("../middlewares");
const authRoute = express.Router();

authRoute.post("/login/firebase", authControllers.loginWithFireBase);
authRoute.post("/refresh", authControllers.refreshToken);
authRoute.post("/logout", verifyToken, authControllers.logout);
authRoute.get("/current-user", verifyToken, authControllers.getCurrentUser);
authRoute.get(
  "/gen-token-livekit",
  verifyToken,
  authControllers.genTokenLivekit
);

module.exports = authRoute;
