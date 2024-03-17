// Import mongoose Module
const mongoose = require("mongoose");

// Create Team Schema (attributes and types)
const teamSchema = mongoose.Schema({
  name: String,
  owner: String,
  foundation: String, // Corrected to camelCase
  players: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Player" // References the Player model
  }],
  staduimID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Staduim" // References the Staduim model
  }
});

// Create Model and associate it with the teamSchema
const Team = mongoose.model("Team", teamSchema);

// Export the Team model to be importable
module.exports = Team;
