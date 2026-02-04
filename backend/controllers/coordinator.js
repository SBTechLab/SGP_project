const Coordinator = require("../models/coordinator");
const Event=require("../models/event");
const { setUser } = require("../services/userAuth");
// REGISTER CONTROLLER
const registerCoordinator = async (req, res) => {
  try {
    const { coordinatorId, name, email, department, password } = req.body;

    if (!coordinatorId || !name || !email || !department || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingCoordinator = await Coordinator.findOne({
      $or: [{ email }, { coordinatorId }],
    });

    if (existingCoordinator) {
      return res.status(400).json({
        message: "Coordinator already exists",
      });
    }

    const coordinator = new Coordinator({
      coordinatorId,
      name,
      email,
      department, 
      password,  
    });

    await coordinator.save();

    res.status(201).json({
      message: "Coordinator registered successfully",
      coordinator: {
        coordinatorId: coordinator.coordinatorId,
        name: coordinator.name,
        email: coordinator.email,
        department: coordinator.department,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

// LOGIN CONTROLLER
const loginCoordinator = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const coordinator = await Coordinator.findOne({ email });

    if (!coordinator) {
      return res.status(404).json({
        message: "Coordinator not found",
      });
    }

    if (coordinator.password !== password) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = setUser(coordinator, "Coordinator");
    res.cookie("uuid", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    res.status(200).json({
      message: "Login successful",
      coordinator: {
        coordinatorId: coordinator.coordinatorId,
        name: coordinator.name,
        email: coordinator.email,
        department: coordinator.department,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

async function createEvent(req, res) {
  try {
    const {
      eventId,
      title,
      description,
      date,
      startTime,
      endTime,
      location,
      capacity
    } = req.body;

    // coordinator comes from JWT
    const coordinatorId = req.user?.id;
    console.log("Coordinator ID:", coordinatorId);

    if (
      !eventId || !title || !description || !date ||
      !startTime || !endTime || !location || !capacity
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

   
    const exists = await Event.findOne({ eventId });
    if (exists) {
      return res.status(409).json({
        success: false,
        message: "Event ID already in use"
      });
    }

    const event = await Event.create({
      eventId: eventId.trim(), // 👈 important
      title,
      description,
      date,
      startTime,
      endTime,
      location,
      capacity,
      createdBy: coordinatorId
    });

    return res.status(201).json({
      success: true,
      message: "Event created successfully",
      event
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
}





module.exports = {
  registerCoordinator,
  loginCoordinator,
  createEvent
};
