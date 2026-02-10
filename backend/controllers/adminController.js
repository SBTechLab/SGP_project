const Admin = require("../models/admin");
const Coordinator = require("../models/coordinator");
const { setUser } = require("../services/userAuth");

/* ===============================
   REGISTER ADMIN
================================ */
const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const admin = new Admin({ name, email, password });
    await admin.save();

    res.status(201).json({
      message: "Admin registered successfully",
      admin: { name: admin.name, email: admin.email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/* 
   LOGIN ADMIN
*/
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    if (admin.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = setUser(admin, "Admin");
    res.cookie("uuid", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successful",
      admin: { name: admin.name, email: admin.email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/* 
   ADMIN → MANAGE COORDINATORS
 */

// GET ALL COORDINATORS
const getAllCoordinators = async (req, res) => {
  try {
    const coordinators = await Coordinator.find().select("-password");

    res.status(200).json({
      success: true,
      coordinators,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// DELETE COORDINATOR
const deleteCoordinator = async (req, res) => {
  try {
    const { id } = req.params;

    const coordinator = await Coordinator.findByIdAndDelete(id);
    if (!coordinator) {
      return res.status(404).json({
        success: false,
        message: "Coordinator not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Coordinator deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
  getAllCoordinators,
  deleteCoordinator,
};
