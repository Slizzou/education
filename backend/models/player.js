// Import mongoose Module
const mongoose = require("mongoose");

// Create Player Schema (attributes and types)
const playerSchema = mongoose.Schema({
  name: String,
  picture: String,
  number: Number,
  position: String,
  age: Number,
  teamID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team" // References the Team model
  }
});

// Create Model and associate it with the playerSchema
const Player = mongoose.model("Player", playerSchema);

// Export the Player model to be importable
module.exports = Player;
