const mongoose=require("mongoose");
const eventSchema = new mongoose.Schema(
  {
    eventId: {
      type: String,
      required: true,
      unique: true
    },

    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true
    },

    date: {
      type: Date,
      required: true
    },

    startTime: {
      type: String,
      required: true
    },

    endTime: {
      type: String,
      required: true
    },

    location: {
      type: String,
      required: true
    },

    capacity: {
      type: Number,
      required: true,
      min: 1
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coordinator", 
      required: true
    }
  },
  {
    timestamps: true // adds createdAt & updatedAt
  }
);

module.exports=mongoose.model("Event",eventSchema);
