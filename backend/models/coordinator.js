const mongoose = require("mongoose");

const coordinatorSchema = new mongoose.Schema({
  coordinatorId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },

  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },

  department: {
    type: String,
    enum: ["CSE", "CE", "AIML","IT"],
    required: true
  },

  password: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Coordinator", coordinatorSchema);
