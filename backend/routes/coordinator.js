const express = require("express");
const coordinatorRoute = express.Router();

const { registerCoordinator,loginCoordinator} = require("../controllers/coordinator");

coordinatorRoute.post("/register",registerCoordinator);
coordinatorRoute.post("/login",loginCoordinator);

module.exports=coordinatorRoute;