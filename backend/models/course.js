//import mongoose Module
const mongoose =require("mongoose")
//Create Match Schema (attributes and types)
const courseSchema=mongoose.Schema({
name:String,
owner:String,
description:String,
duration:Number,
teacherID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User" //
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User" // References the Player model
  }],
  feedbacks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Feedback" // References the Team model
  }],




});
//Create Model and affect to matchScheam
const course=mongoose.model("Course",courseSchema);
//Exports match (to be importable)
module.exports=course