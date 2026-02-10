const express = require("express");
const adminRoute = express.Router();

const {
  registerAdmin,
  loginAdmin,
  getAllCoordinators,
  deleteCoordinator,
} = require("../controllers/adminController");

const { auth, requireRole } = require("../middlewares/auth");

// ================== AUTH ==================

// Admin register
adminRoute.post("/register", registerAdmin);

// Admin login
adminRoute.post("/login", loginAdmin);

// ================== MANAGE COORDINATORS ==================

// Get all coordinators (ADMIN ONLY)
adminRoute.get(
  "/coordinators",
  auth,
  requireRole("Admin"),
  getAllCoordinators
);

// Delete coordinator by id (ADMIN ONLY)
adminRoute.delete(
  "/coordinator/:id",
  auth,
  requireRole("Admin"),
  deleteCoordinator
);

module.exports = adminRoute;
