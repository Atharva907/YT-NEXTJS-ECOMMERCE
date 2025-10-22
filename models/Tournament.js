// Import mongoose for schema creation
import mongoose from "mongoose";

// Define the tournament schema
const tournamentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  game: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  startDate: {
    type: String,
    required: true
  },
  endDate: {
    type: String,
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
  maxParticipants: {
    type: Number,
    required: true
  },
  currentParticipants: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ["upcoming", "live", "completed"],
    default: "upcoming"
  },
  prize: {
    type: String,
    required: true
  },
  rules: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    default: ""
  }
}, {
  timestamps: true // Add createdAt and updatedAt timestamps
});

// Create and export the Tournament model
export default mongoose.models.Tournament || mongoose.model("Tournament", tournamentSchema);
