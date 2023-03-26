const express = require("express");
const authControllers = require("../controllers/auth.controller");
const authRoute = express.Router();

authRoute.post("/login/firebase", authControllers.loginWithFireBase);
authRoute.get("/test", () => {
  res.json("test");
});

module.exports = authRoute;
