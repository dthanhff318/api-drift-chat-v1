const express = require("express")

const {verifyToken} = require("../middlewares")
const groupController = require("../controllers/groupController")

const groupRoute = express.Router()

groupRoute.get("/",verifyToken,groupController.getAllGroup)

module.exports = groupRoute