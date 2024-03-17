//import Mongoose Module 
const mongoose = require("mongoose")
//Create User Schema 
const feedbackSchema = mongoose.Schema({
    teacherName: String,
    notes: Number,
    evaluation:String,
    teacherID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User" // References the Team model
      },
      courseID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course" // References the Team model
      },
      studetID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User" // References the Team model
      },


});

const feedback = mongoose.model("Feedback", feedbackSchema);
module.exports = feedback;