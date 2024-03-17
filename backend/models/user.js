//import Mongoose Module 
const mongoose = require("mongoose")
//Create User Schema 
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber:Number,
    pwd: String,
    role: String,
    avatar: String,
    cv: String,
    courseID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course" 
      },
     
      feedbacks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Feedback" // References the Team model
      }],

});
const user = mongoose.model("User", userSchema);
module.exports = user;