const express = require("express");
const coordinatorRoute = express.Router();

const { registerCoordinator,loginCoordinator,createEvent} = require("../controllers/coordinator");
const {auth, requireRole } = require("../middlewares/auth");

coordinatorRoute.post("/register",registerCoordinator);
coordinatorRoute.post("/login",loginCoordinator);
coordinatorRoute.post("/create-event",auth,requireRole("Coordinator"),createEvent);

module.exports=coordinatorRoute;