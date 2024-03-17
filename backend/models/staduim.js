// Import mongoose Module
const mongoose = require("mongoose");

// Create Player Schema (attributes and types)
const staduimSchema = mongoose.Schema({
  name: String,
  country: String,
  capacity: Number,
  teamID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team" // References the Team model
  }
});

// Create Model and associate it with the playerSchema
const Staduim = mongoose.model("Staduim", staduimSchema);

// Export the Player model to be importable
module.exports = Staduim;
