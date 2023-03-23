const express = require("express");
const authRoute = express.Router();

authRoute.get("/test", (req, res) => {
  res.json("tesst");
});

module.exports = authRoute;
